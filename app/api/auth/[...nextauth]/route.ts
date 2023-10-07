import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "@/app/lib/authOptions"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }