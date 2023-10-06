import Link from "next/link";

export const metadata = {
    title: "404 - Page not found",
    description: "Sorry, we couldn’t find the page you’re looking for.",
};

export default function NotFound() {
    return (
        <>
            <main className="grid min-h-full place-items-center w-full px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-red-600">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-500">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/"
                            className="rounded-3xl bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Go back home
                        </Link>
                        <a
                            href="mailto:yassinechettouch@gmail.com"
                            className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:underline"
                        >
                            Contact developer{" "}
                            <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}