import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        },
        async jwt({token}) {
            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    ...authConfig
})