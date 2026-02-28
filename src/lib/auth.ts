import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "founder@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user || (!user.passwordHash && !user.id)) return null

                // If password is not set (e.g. OAuth only so far), reject credential login
                if (!user.passwordHash) return null

                const isValid = await bcrypt.compare(credentials.password, user.passwordHash)

                if (!isValid) return null

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string
            }
            return session
        },
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && user.email) {
                // Auto-create user if they don't exist
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email }
                })

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name || "",
                            subscriptionPlan: "free",
                        }
                    })
                }
            }
            return true
        }
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
