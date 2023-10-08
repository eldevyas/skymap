"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { LoginCurve } from "iconsax-react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type Inputs = {
    "Full Name": string,
    "Email": string,
    "Password": string,
    "Password Confirmation": string,
}

const schema = yup.object().shape({
    // The Full
    "Full Name": yup.string()
        .required('Full name is required.')
        .matches(/^[A-Za-z\s]*$/, 'Full name must contain only letters and spaces.')
        .min(2, 'Full name must be at least 2 characters long.'),
    "Email": yup.string().email().required("Email is required."),
    "Password": yup.string().min(8).required("Password is required."),
    "Password Confirmation": yup.string().nullable().oneOf([yup.ref("Password"), null], "Passwords must match.").required("Password Confirmation is required."),
})


export default function RegisterationInterface() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                "Full Name": "",
                "Email": "",
                "Password": "",
                "Password Confirmation": "",
            },
        }
    )

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // TODO: Implement Validation
        toast.error(`
        Full Name: ${data["Full Name"]} \nEmail: ${data["Email"]} \nPassword: ${data["Password"]} \nConfirm Password: ${data["Password Confirmation"]}
        `, {
            icon: "🚧",
            duration: 5000,
        });

        // TODO: Implement registeration logic
    };

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
                        className="inline-flex justify-center items-center text-center flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:border-amber-500 w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white hover:bg-slate-200 dark:hover:border-amber-100 dark:hover:bg-amber-500 dark:hover:text-amber-100"
                    >
                        <FontAwesomeIcon
                            color="currentColor"
                            icon={faGoogle}
                            className="text-lg"
                        />
                        <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                            Sign up with Google
                        </span>
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center items-center text-center flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:border-amber-500 w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white hover:bg-slate-200 dark:hover:border-amber-100 dark:hover:bg-amber-500 dark:hover:text-amber-100"
                        onClick={() => {
                            toast.error("Coming soon!", {
                                icon: "🚧",
                                duration: 5000,
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            color="currentColor"
                            icon={faGithub}
                            className="text-lg"
                        />
                        <span className="ml-2 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                            Sign up with GitHub
                        </span>
                    </button>
                </div>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-2 bg-slate-900 border-0 dark:bg-slate-50 opacity-25" />
                    <span className="relative px-3 font-medium text-slate-900 dark:text-white">
                        or
                    </span>
                    <hr className="w-full h-px my-2 bg-slate-900 border-0 dark:bg-slate-50 opacity-25" />
                </div>
                <form
                    className="w-full flex flex-col justify-center items-center gap-5 mb-5"
                    action="#"
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
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
                            placeholder="John Doe"
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-amber-500 focus:border-amber-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500 dark:focus:outline-amber-500"
                            {...register("Full Name", { required: true })}
                        />
                        {
                            errors["Full Name"] &&
                            (<span className="text-amber-500 text-xs">
                                {errors["Full Name"].message}
                            </span>)
                        }
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
                            id="email"
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-amber-500 focus:border-amber-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500 dark:focus:outline-amber-500"
                            placeholder="mail@example.com"
                            required={false}
                            {...register("Email", { required: true })}
                        />
                        {
                            errors["Email"] &&
                            (<span className="text-amber-500 text-xs">
                                {errors["Email"].message}
                            </span>)
                        }
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
                            id="password"
                            placeholder="••••••••"
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-amber-500 focus:border-amber-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500 dark:focus:outline-amber-500"
                            required={false}
                            {...register("Password", { required: true })}
                        />
                        {
                            errors["Password"] &&
                            (<span className="text-amber-500 text-xs">
                                {errors["Password"].message}
                            </span>)
                        }
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
                            id="password"
                            placeholder="••••••••"
                            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-3xl focus:ring-amber-500 focus:border-amber-500 block w-full py-2.5 px-5 dark:bg-slate-900 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500 dark:focus:outline-amber-500"
                            required={false}
                            {...register("Password Confirmation", { required: true })}
                        />
                        {
                            errors["Password Confirmation"] &&
                            (<span className="text-amber-500 text-xs">
                                {errors["Password Confirmation"].message}
                            </span>)
                        }
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    className="w-4 h-4 text-amber-500 bg-slate-100 border-slate-300 rounded focus:ring-amber-500 dark:focus:ring-amber-500 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-900 dark:border-slate-800"
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
                        className="inline-flex justify-center items-center gap-2  focus:outline-none w-full text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 font-medium rounded-3xl text-sm px-5 py-2.5 mb-2 dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus:ring-amber-900"
                    >
                        Sign up
                        <LoginCurve color="currentColor" variant="Bulk" />
                    </button>
                    <p className="text-sm font-light text-slate-500 dark:text-slate-400 text-center">
                        Already have an account?{" "}
                        <Link
                            href={"/auth/sign-in"}
                            className="font-medium text-amber-500 hover:underline dark:text-amber-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}


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