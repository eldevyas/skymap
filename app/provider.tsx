"use client";

import React from 'react'
import NextTopLoader from 'nextjs-toploader';
import toast, { ToastBar, Toaster, resolveValue } from "react-hot-toast";
import Colors from "tailwindcss/colors"
import { CloseSquare } from 'iconsax-react';
import { ThemeProvider, useTheme } from "next-themes";
import { AppContextProvider } from './context';
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth';

const BeamsBackground = () => {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 -z-30 w-full h-full min-h-screen overflow-hidden">
            {/* Blob Blurry Shapes */}
            <div className="absolute skew-x-12 top-64 rotate-45 left-1/2 translate-x-1/2 scale-x-150 -translate-y-1/2 w-96 h-64 bg-red-600 rounded-full opacity-25 filter dark:bg-red-600 -z-40 blur-3xl scale-150" />
            <div className="absolute skew-x-12 bottom-16 rotate-45 left-1/3 translate-x-1/2 scale-x-150 -translate-y-1/2 w-96 h-64 bg-sky-600 rounded-full opacity-25 filter dark:bg-sky-600 -z-40 blur-3xl scale-150" />
            <div className="absolute skew-x-12 bottom-64 rotate-45 right-2/3 translate-x-2/3 scale-x-150 -translate-y-1/2 w-96 h-64 bg-red-400 rounded-full opacity-25 filter dark:bg-red-400 -z-50 blur-3xl scale-150" />

            {/* Full Size Grid */}
            <div
                className="relative w-full h-full min-h-screen background -z-30 mix-blend-screen"
            />
        </div>
    )
}

export default function Provider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const [state, setState] = React.useState("The code sounds are good but quiet slow, they probably slow down the OS, or they have some kind of delay.");

    return (
        <AppContextProvider>
            <ThemeProvider attribute="class">
                <div
                    className="relative bg-slate-100 dark:bg-slate-950 h-full min-h-screen w-full flex flex-col justify-start items-start z-10"
                >
                    <BeamsBackground />
                    <NextTopLoader
                        color={Colors.red[500]}
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={5}
                        crawl={true}
                        showSpinner={false}
                        easing="ease"
                        speed={200}
                        shadow={`0 0 10px ${Colors.red["500"]},0 0 5px ${Colors.red["500"]}`}
                    />
                    {children}
                    <ToastProvider />
                </div>
            </ThemeProvider>
        </AppContextProvider>
    )
}

const ToastProvider = () => {
    return (
        <React.Fragment>
            <div
                className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            >
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 5000,
                        className: "cursor-default",
                        style: {
                            border: "none",
                            padding: 0,
                            color: "currentColor",
                            background: "none",
                            backgroundColor: "none",
                            cursor: "default",
                            zIndex: 50,
                            boxShadow: "none",
                            pointerEvents: "all",
                        },
                        // Default options for specific types
                        success: {
                            duration: 1000,
                            iconTheme: {
                                primary: "#10b981",
                                secondary: "#064e3b",
                            },
                        } as any,
                        error: {
                            duration: 3000,
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: "#7f1d1d",
                            },
                        } as any,
                    }}
                >
                    {(t) => (
                        <ToastBar
                            position="top-center" // Used to adapt the animation
                            toast={t}
                            key={t.id}
                        >
                            {({ icon, message }) => (
                                <div
                                    id="toast-default"
                                    className="flex max-w-sm bg-slate-50 items-center justify-center space-x-2 rounded-3xl p-3 border border-slate-300 outline-none dark:border-slate-600 dark:bg-slate-900"
                                    role="alert"
                                >
                                    <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl">
                                        {icon}
                                        <span className="sr-only">
                                            Toast Icon
                                        </span>
                                    </div>
                                    <div className="ml-3 text-sm font-normal text-slate-500 dark:text-slate-400">
                                        {message}
                                    </div>
                                    {t.type !== "loading" && (
                                        <button
                                            type="button"
                                            className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-xl slate p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-white"
                                            data-dismiss-target="#toast-default"
                                            aria-label="Close"
                                            onClick={() => toast.dismiss(t.id)}
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <CloseSquare
                                                className="h-5 w-5 text-slate-400 dark:text-slate-300"
                                                color="currentColor"
                                                variant="Bulk"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    )}
                                </div>
                            )}
                        </ToastBar>
                    )}
                </Toaster>
            </div>
        </React.Fragment>
    )
}