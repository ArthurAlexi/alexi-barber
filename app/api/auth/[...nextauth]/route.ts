import { authOptions } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }