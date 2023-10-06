"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Facebook, Google, Login, LoginCurve } from "iconsax-react";
import Image from "next/image";

const ICON = ({ isLoading }: { isLoading: boolean }) => {
    const Router = useRouter();

    return (
        <div
            className={`${isLoading && "animate-bounce"
                } relative flex justify-center items-center h-16 w-16 aspect-square mb-2 p-1 bg-slate-50 border border-slate-300 rounded-3xl dark:bg-slate-900 dark:border-slate-600 select-none cursor-pointer`}
            onClick={() => Router.push("/")}
        >
            <Image
                src="/svg/logo.svg"
                className="h-2/3 w-2/3 object-contain"
                alt="Logo"
                width={50}
                height={50}
            />
        </div>
    );
};

export default function RegisterationPage() {
    return (
        <div className="flex flex-col items-center justify-center p-5 mx-auto h-auto lg:py-0 gap-2">
            <ICON isLoading={false} />
            <div className="flex flex-col justify-center items-center w-full max-w-lg gap-5">
                <h1 className="my-5 text-center text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl dark:text-white">
                    Sign up for a new account
                </h1>
                {/* Social Buttons */}
                <div className="flex flex-row gap-2 justify-between w-full flex-wrap">
                    <button
                        type="button"
                        className="inline-flex justify-center items-center text-center flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:border-red-500 w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white hover:bg-slate-200 dark:hover:border-red-100 dark:hover:bg-red-600 dark:hover:text-red-100"
                    >
                        <Google
                            color="currentColor"
                            variant="Bulk"
                            className="w-6 h-6"
                        />
                        <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                            Sign up with Google
                        </span>
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center items-center text-center flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:border-red-500 w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white hover:bg-slate-200 dark:hover:border-red-100 dark:hover:bg-red-600 dark:hover:text-red-100"
                    >
                        <Facebook
                            color="currentColor"
                            variant="Bulk"
                            className="w-6 h-6"
                        />
                        <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                            Sign up with Facebook
                        </span>
                    </button>
                </div>

                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-2 bg-slate-300 border-0 dark:bg-slate-600" />
                    <span className="absolute px-3 font-medium text-slate-900 -translate-x-1/2 bg-slate-100 left-1/2 dark:text-white dark:bg-slate-950">
                        or
                    </span>
                </div>
                <form
                    className="w-full flex flex-col justify-center items-center gap-5 mb-5"
                    action="#"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        toast.success(
                            "Hang tight! You can still use the app without authentication for now.",
                            {
                                icon: "🤫",
                                duration: 5000,
                            }
                        );
                    }}
                >
                    <div className="w-full">
                        <label
                            htmlFor="fullName"
                            className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="John Doe"
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:focus:outline-red-500"
                            required={false}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:focus:outline-red-500"
                            placeholder="mail@example.com"
                            required={false}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:focus:outline-red-500"
                            required={false}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:focus:outline-red-500"
                            required={false}
                        />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    className="w-4 h-4 text-red-600 bg-slate-100 border-slate-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-900 dark:border-slate-800"
                                    required={false}
                                />
                            </div>

                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="remember"
                                    className="text-slate-500 dark:text-slate-300"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex justify-center items-center gap-2  focus:outline-none w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Sign up
                        <LoginCurve color="currentColor" variant="Bulk" />
                    </button>
                    <p className="text-sm font-light text-slate-500 dark:text-slate-400 text-center">
                        Already have an account?{" "}
                        <Link
                            href={"/auth/sign-in"}
                            className="font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}