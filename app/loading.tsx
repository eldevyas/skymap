import React from "react";
import Image from "next/image";


export default function Loading() {
    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 inset-0 h-full min-h-screen w-full flex justify-center items-center z-50 bg-slate-50 dark:bg-slate-950"
        >
            <div
                className={`relative flex justify-center items-center h-auto w-auto aspect-square p-5 bg-white border border-slate-300 rounded-3xl dark:bg-slate-900 dark:border-slate-600 select-none`}
            >
                <Image
                    src="/svg/logo.svg"
                    className="object-contain"
                    alt="Logo"
                    width={50}
                    height={50}
                />
            </div>
        </div>
    );
}