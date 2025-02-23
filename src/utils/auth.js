import { PrismaAdapter } from "@auth/prisma-adapter";
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
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        // Create new user in database
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
          },
        });
      }

      return true; // Allow sign-in
    },
    async session({ session, token, user }) {
      // Attach user ID to session
      session.user.id = user.id;
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
