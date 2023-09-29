import React from 'react'
import { SearchNormal } from "iconsax-react";

export default function SearchBar() {
    return (
        <>
            {/* Search Bar */}
            <div
                className="mb-3 flex w-full items-center"
            >
                <label className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-5">
                        <SearchNormal
                            className="h-5 w-5"
                            color="currentColor"
                            variant="TwoTone"
                        />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-3xl border border-slate-300 outline-none bg-slate-50 px-5 py-2.5 pl-14 text-sm text-slate-900 focus:border-sky-500 focus:ring-sky-500  dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
                        placeholder="Search City..."
                        required
                    />
                    <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform rounded-3xl border border-slate-200 bg-slate-100/50 px-2 py-1 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                        ⌘ K
                    </kbd>
                </div>
                <button
                    type='button'
                    className="ml-2 rounded-3xl border border-sky-700 bg-sky-700 p-2.5 text-sm font-medium text-white hover:bg-sky-800 focus:outline-none dark:bg-sky-600 dark:hover:bg-sky-700"
                >
                    <SearchNormal
                        className="h-5 w-5"
                        color="currentColor"
                        variant="TwoTone"
                    />
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </>
    )
}
