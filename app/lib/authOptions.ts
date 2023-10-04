import type { NextAuthOptions } from "next-auth"
import axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/sign-in',
        signOut: '/auth/sign-out',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/confirm-email', // (used for check email message)
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {},
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            type: "credentials",
            credentials: {
                email: { name: "email", label: "Email", type: "text", placeholder: "yassine@skymap.net" },
                password: { name: "password", label: "Password", type: "password" }
            },
            async authorize(credentials: any, req: any): Promise<any> {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                }

                // I will use a single user for this example - and later will implement a real authentication
                const validUser = {
                    id: 1,
                    fullName: 'Yassine Chettouch',
                    username: 'yassine',
                    email: 'yassinechettouch@gmail.com',
                    password: '123456',
                }

                const isValid = email === validUser.email && password === validUser.password;

                if (isValid) {
                    return validUser;
                } else {
                    return null;
                }
            }
        })
    ],
}