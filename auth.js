//
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./lib/db";
import mongoClientPromise from "./lib/mongoClientPromise";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./lib/token";
import { userModel } from "./models/User";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        //conntect to db
        await connectDB();

        const { email, password, role } = credentials;

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        if (role === "shopOwner" && user.role !== "shopOwner") {
          throw new Error("You are not registered as a shop owner");
        }

        if (role === "customer" && user.role !== "customer") {
          throw new Error(
            "This account belongs to a shop owner. Use shop login.",
          );
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  //trying callback

  //another tring callback
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        token.id = user.id;
        token.role = user.role;
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 min

        return token;
      }

      if (Date.now() < token.accessTokenExpires) return token;

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});

//testing session

async function refreshAccessToken(token) {
  try {
    const decoded = verifyRefreshToken(token.refreshToken);

    const newAccessToken = generateAccessToken(decoded);

    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch {
    return { ...token, error: "RefreshFailed" };
  }
}
