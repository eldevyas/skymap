import type { NextAuthOptions } from "next-auth"
import axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: '/auth/sign-in',
    //     signOut: '/auth/sign-out',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/confirm-email', // (used for check email message)
    // },
    theme: {
        colorScheme: 'light',
    },
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        }),
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