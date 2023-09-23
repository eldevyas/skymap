"use client";


import React from 'react'
import NextTopLoader from 'nextjs-toploader';
import toast, { ToastBar, Toaster, resolveValue } from "react-hot-toast";

import Colors from "tailwindcss/colors"
import { CloseSquare } from 'iconsax-react';

export default function Provider({ children }: {
    children: React.ReactNode
}) {
    return (
        <div
            className="bg-white dark:bg-slate-900 h-full min-h-screen w-full flex flex-col justify-center items-center flex-1 z-10"
        >
            <NextTopLoader
                color={Colors.sky[500]}
                initialPosition={0.08}
                crawlSpeed={200}
                height={5}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow={`0 0 10px ${Colors.blue["500"]},0 0 5px ${Colors.sky["500"]}`}
            />
            <Toaster
                position="top-center"
                toastOptions={{
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
                                className="flex max-w-sm shadow-2xl filter-none items-center justify-center space-x-2 rounded-3xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
                                role="alert"
                            >
                                <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl">
                                    {icon}
                                    <span className="sr-only">
                                        Toast Icon
                                    </span>
                                </div>
                                <div className="ml-3 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                                    {message}
                                </div>
                                {t.type !== "loading" && (
                                    <button
                                        type="button"
                                        className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-xl bg-white p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-white"
                                        data-dismiss-target="#toast-default"
                                        aria-label="Close"
                                        onClick={() => toast.dismiss(t.id)}
                                    >
                                        <span className="sr-only">
                                            Close
                                        </span>
                                        <CloseSquare
                                            className="h-5 w-5 text-zinc-400 dark:text-zinc-300"
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
    )
}
