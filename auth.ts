import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/lib/data/user"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

// This is a workaround for the Edge Runtime compatibility issue
// The PrismaAdapter will only be used in Node.js environments
let PrismaAdapter: any;
if (process.env.NEXT_RUNTIME !== 'edge') {
  try {
    // We're not directly importing to avoid Edge Runtime errors
    // This code won't execute in Edge
    import('@auth/prisma-adapter')
      .then((module) => {
        PrismaAdapter = module.PrismaAdapter;
      })
      .catch((err) => {
        console.error("Failed to import PrismaAdapter:", err);
      });
  } catch (error) {
    console.error("Error importing PrismaAdapter:", error);
  }
}

// Use this config for non-Edge environments (Node.js)
const config: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getUserByEmail(credentials.email as string);

        if (!user || !user.password) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isCorrectPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      const existingUser = user?.email ? await getUserByEmail(user.email) : null;

      if (existingUser) {
        token.id = existingUser.id;
        token.role = existingUser.role;
      }
      
      return token;
    }
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

// In Node.js environment (not Edge), apply the adapter
if (process.env.NEXT_RUNTIME !== 'edge' && PrismaAdapter) {
  (config as any).adapter = PrismaAdapter(db);
}

export const { handlers, signIn, signOut, auth } = NextAuth(config); 