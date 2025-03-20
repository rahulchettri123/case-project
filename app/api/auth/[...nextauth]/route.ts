import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/data/user";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";

// Define types for session, token, and user
interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string;
  image?: string | null;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

interface ExtendedToken extends JWT {
  id?: string;
  role?: string;
}

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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

        const user = await getUserByEmail(credentials.email);

        if (!user || !user.password) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
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
    async session({ session, token }: { session: ExtendedSession; token: ExtendedToken }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }: { token: ExtendedToken; user?: ExtendedUser }) {
      const existingUser = user?.email ? await getUserByEmail(user.email) : null;

      if (existingUser) {
        token.id = existingUser.id;
        token.role = existingUser.role;
      }
      
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 