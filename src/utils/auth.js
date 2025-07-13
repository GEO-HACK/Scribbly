import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      },
      httpOptions: {
        timeout: 10000,
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // Handle both database and JWT sessions
      if (user) {
        session.user.id = user.id;
      } else if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      // Allow test login without database
      if (account?.provider === "test") {
        return true;
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for now to avoid database issues
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signIn(message) {
      console.log("🔐 Sign in success:", message.user.email);
    },
    async signOut(message) {
      console.log("🔓 Sign out:", message.token?.email);
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
