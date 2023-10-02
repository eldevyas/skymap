"use client";


import React from 'react'
import NextTopLoader from 'nextjs-toploader';
import toast, { ToastBar, Toaster, resolveValue } from "react-hot-toast";

import Colors from "tailwindcss/colors"
import { CloseSquare } from 'iconsax-react';
import { ThemeProvider, useTheme } from "next-themes";
import { AppContextProvider } from './context';

export default function Provider({ children }: {
    children: React.ReactNode
}) {
    const { theme } = useTheme();

    return (
        <AppContextProvider>
            <ThemeProvider attribute="class">
                <div
                    className="bg-gray-100 dark:bg-gray-950 h-full min-h-screen w-full flex flex-col justify-start items-start z-10 background"
                >
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
                                        className="flex max-w-sm shadow-2xl bg-gray-50 items-center justify-center space-x-2 rounded-3xl p-3 border border-gray-300 outline-none dark:border-gray-600 dark:bg-gray-900"
                                        role="alert"
                                    >
                                        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl">
                                            {icon}
                                            <span className="sr-only">
                                                Toast Icon
                                            </span>
                                        </div>
                                        <div className="ml-3 text-sm font-normal text-gray-500 dark:text-gray-400">
                                            {message}
                                        </div>
                                        {t.type !== "loading" && (
                                            <button
                                                type="button"
                                                className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-xl gray p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-white"
                                                data-dismiss-target="#toast-default"
                                                aria-label="Close"
                                                onClick={() => toast.dismiss(t.id)}
                                            >
                                                <span className="sr-only">
                                                    Close
                                                </span>
                                                <CloseSquare
                                                    className="h-5 w-5 text-gray-400 dark:text-gray-300"
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
                    {children}
                </div>
            </ThemeProvider>
        </AppContextProvider>
    )
}
