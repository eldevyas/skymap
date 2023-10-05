"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";


export default function AuthProvider({ children, ...props }: {
    children: React.ReactNode,
    session: Session
}) {
    return (
        <SessionProvider
            session={
                props.session
            }
        >
            {children}
        </SessionProvider>
    )
};