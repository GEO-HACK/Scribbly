import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession } from "next-auth";

// Validate required environment variables
const requiredEnvVars = [
  'NEXTAUTH_SECRET',
  'GITHUB_ID',
  'GITHUB_SECRET',
  'GOOGLE_ID',
  'GOOGLE_SECRET'
];

// Check for missing environment variables
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error("🚨 Missing environment variables:", missingEnvVars);
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  }
}

// Log environment info (without secrets)
console.log("🔧 Auth configuration:", {
  nodeEnv: process.env.NODE_ENV,
  nextauthUrl: process.env.NEXTAUTH_URL,
  hasGithubId: !!process.env.GITHUB_ID,
  hasGithubSecret: !!process.env.GITHUB_SECRET,
  hasGoogleId: !!process.env.GOOGLE_ID,
  hasGoogleSecret: !!process.env.GOOGLE_SECRET,
  hasNextauthSecret: !!process.env.NEXTAUTH_SECRET,
});

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
      try {
        console.log("🔐 SignIn attempt:", {
          provider: account?.provider,
          email: user?.email,
          env: process.env.NODE_ENV
        });
        
        // Allow test login without database
        if (account?.provider === "test") {
          return true;
        }

        // Handle account linking for OAuth providers
        if (account?.provider === "google" || account?.provider === "github") {
          try {
            // Check if user already exists with this email
            const existingUser = await prisma.user.findUnique({
              where: { email: user.email },
              include: { accounts: true }
            });

            if (existingUser) {
              // Check if this provider is already linked
              const existingAccount = existingUser.accounts.find(
                acc => acc.provider === account.provider
              );

              if (!existingAccount) {
                // Link the new provider to existing user
                await prisma.account.create({
                  data: {
                    userId: existingUser.id,
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                  }
                });
                console.log("✅ Account linked successfully:", {
                  userId: existingUser.id,
                  provider: account.provider,
                  email: user.email
                });
              }
              return true;
            }
          } catch (error) {
            console.error("🚨 Account linking error:", error);
            // Continue with normal flow if linking fails
          }
        }
        
        return true;
      } catch (error) {
        console.error("🚨 SignIn error:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects properly for deployment
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
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
