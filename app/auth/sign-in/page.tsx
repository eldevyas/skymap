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
                } relative flex justify-center items-center h-16 w-16 aspect-square mb-2 p-1 bg-white border border-zinc-200 rounded-lg shadow-2xl dark:bg-zinc-950 dark:border-zinc-700 select-none cursor-pointer`}
            onClick={() => Router.push("/")}
        >
            <Image
                src="/favicon.png"
                className="h-2/3 w-2/3 object-contain"
                alt="Logo"
            />
        </div>
    );
};
export default function LoginPage() {
    return (
        <section className="w-full min-h-full flex flex-col justify-center items-center flex-1 z-10 background">
            <div className="flex flex-col items-center justify-center p-5 mx-auto h-auto lg:py-0 gap-2">
                <ICON isLoading={false} />
                <div className="flex flex-col justify-center items-center w-full max-w-lg gap-5">
                    <h1 className="my-5 text-center text-xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl dark:text-white">
                        Sign in to your account
                    </h1>
                    {/* Social Buttons */}
                    <div className="flex flex-row gap-2 justify-between w-full flex-wrap">
                        <button
                            type="button"
                            className="inline-flex justify-center items-center text-center flex-1 py-2.5 px-5 bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:border-lime-500 w-full p-2.5 dark:bg-zinc-950 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white hover:bg-zinc-200 dark:hover:border-lime-100 dark:hover:bg-lime-600 dark:hover:text-lime-100"
                        >
                            <Google
                                color="currentColor"
                                variant="Bulk"
                                className="w-6 h-6"
                            />
                            <span className="ml-2 text-sm font-medium text-zinc-900 dark:text-white whitespace-nowrap">
                                Sign in with Google
                            </span>
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center items-center text-center flex-1 py-2.5 px-5 bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:border-lime-500 w-full p-2.5 dark:bg-zinc-950 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white hover:bg-zinc-200 dark:hover:border-lime-100 dark:hover:bg-lime-600 dark:hover:text-lime-100"
                        >
                            <Facebook
                                color="currentColor"
                                variant="Bulk"
                                className="w-6 h-6"
                            />
                            <span className="ml-2 text-sm font-medium text-zinc-900 dark:text-white whitespace-nowrap">
                                Sign in with Facebook
                            </span>
                        </button>
                    </div>

                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-2 bg-zinc-300 border-0 dark:bg-zinc-600" />
                        <span className="absolute px-3 font-medium text-zinc-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-black transition-all duration-500">
                            or
                        </span>
                    </div>
                    <form
                        className="w-full flex flex-col justify-center items-center gap-5 mb-5"
                        action="#"
                        autoComplete="off"
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log(e.target);
                            toast.success(
                                "Hang tight ! You can still use the alpha for now.",
                                {
                                    icon: "🤫",
                                    duration: 5000,
                                }
                            );
                        }}
                    >
                        <div className="w-full">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-zinc-950 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                                placeholder="name@foorsa.ma"
                                required={false}
                                autoComplete={"off"}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-zinc-950 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                                required={false}
                                autoComplete={"off"}
                            />
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="remember"
                                        aria-describedby="remember"
                                        type="checkbox"
                                        className="w-4 h-4 text-lime-600 bg-zinc-100 border-zinc-300 rounded focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-zinc-950 focus:ring-2 dark:bg-zinc-900 dark:border-zinc-950"
                                        required={false}
                                    />
                                </div>

                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="remember"
                                        className="text-zinc-500 dark:text-zinc-300"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <a className="text-sm font-medium text-lime-500 hover:underline dark:text-lime-500 cursor-pointer">
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex justify-center items-center gap-2  focus:outline-none w-full text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-900"
                        >
                            Sign in
                            <LoginCurve color="currentColor" variant="Bulk" />
                        </button>
                        <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 text-center">
                            Don’t have an account yet?{" "}
                            <Link
                                href={"/auth/sign-up"}
                                className="font-medium text-lime-600 hover:underline dark:text-lime-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}