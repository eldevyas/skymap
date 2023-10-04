"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeSlash, Facebook, Google, Login, LoginCurve } from "iconsax-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Logo = ({ isLoading }: { isLoading: boolean }) => {
    const router = useRouter();

    return (
        <div
            className={`${isLoading && "animate-bounce"
                } relative flex justify-center items-center h-16 w-16 aspect-square mb-2 p-1 bg-slate-50 border border-slate-300 rounded-3xl dark:bg-slate-900 dark:border-slate-600 select-none cursor-pointer`}
            onClick={() => router.push("/")}
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

export default function LoginPage() {
    const router = useRouter();

    // Refs
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberRef = useRef<HTMLInputElement>(null);

    // UI States
    const [isLoading, setLoading] = useState(false);

    // Show/hide password
    const [showPassword, setShowPassword] = useState(false);

    // Handle login
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Disable button
        setLoading(true);

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const remember = rememberRef.current?.checked;


        if (!email || !password) {
            setLoading(false);
            if (!email) {
                emailRef.current?.focus();
                toast.error("Please enter your email.", {
                    icon: "📧",
                    duration: 1000,
                });
            } else if (!password) {
                passwordRef.current?.focus();
                toast.error("Please enter your password.", {
                    icon: "🔑",
                    duration: 1000,
                });
            }
            return false;
        }

        toast.promise(new Promise(
            async (resolve, reject) => {
                const res: any = await signIn(
                    "credentials",
                    {
                        email: email,
                        password: password,
                        redirect: false,
                    },
                    { callbackUrl: "/connect" }
                );
                if (res.error) {
                    reject(res.error);
                } else {
                    resolve(res);
                }
            }
        ).then(() => {
            // Enable button
            setLoading(false);

            // Redirect to dashboard
            router.push("/dashboard");
        })
            .catch((err) => {
                // Enable button
                setLoading(false);

                // Show error
                toast.error(err.message, {
                    icon: "🔑",
                    duration: 2000,
                });
            }),
            {
                loading: "Signing in...",
                success: "Signed in successfully! Redirecting...",
                error: "An error occurred while signing in!",
            }
        );


        return (
            <div className="flex flex-col items-center justify-center p-5 mx-auto h-auto lg:py-0 gap-2">
                <Logo isLoading={isLoading} />
                <div className="flex flex-col justify-center items-center w-full max-w-lg gap-5">
                    <h1 className="my-5 text-center text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl dark:text-white">
                        Sign in to your account
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
                                Sign in with Google
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
                                Sign in with Facebook
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
                        onSubmit={handleLogin}
                    >
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
                                ref={emailRef}
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
                            <div
                                className="relative flex items-center justify-center gap-2 w-full"
                                data-testid="password-input"
                            >
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    ref={passwordRef}
                                    placeholder="••••••••"
                                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-red-500 focus:border-red-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 dark:focus:outline-red-500"
                                    required={false}
                                />
                                <button
                                    type="button"
                                    className="absolute right-0 px-5 top-0 h-full text-slate-400 dark:text-slate-600 focus:outline-none"
                                    aria-label="Toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {
                                        showPassword ?
                                            <EyeSlash
                                                color="currentColor"
                                                variant="Bulk"
                                                className="w-6 h-6"
                                            />
                                            :
                                            <Eye
                                                color="currentColor"
                                                variant="Bulk"
                                                className="w-6 h-6"
                                            />
                                    }
                                </button>
                            </div>

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
                                        ref={rememberRef}
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
                            <a className="text-sm font-medium text-red-500 hover:underline dark:text-red-500 cursor-pointer">
                                Forgot password?
                            </a>
                        </div>
                        {
                            isLoading ? (
                                <button
                                    type="button"
                                    className="inline-flex justify-center items-center gap-2 focus:outline-none w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    disabled={true}
                                >
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-6 h-6 mr-2 text-red-500 animate-spin fill-red-50" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>
                            ) :
                                (
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center items-center gap-2  focus:outline-none w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Sign in
                                        <LoginCurve color="currentColor" variant="Bulk" />
                                    </button>
                                )
                        }
                        <p className="text-sm font-light text-slate-500 dark:text-slate-400 text-center">
                            Don’t have an account yet?{" "}
                            <Link
                                href={"/auth/sign-up"}
                                className="font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}