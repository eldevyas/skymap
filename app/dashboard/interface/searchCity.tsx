import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Location, SearchNormal } from "iconsax-react";
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { createClient } from '@google/maps';
import axios from 'axios';
import AppContext, { CityType } from '@/app/context';
import toast from 'react-hot-toast';
import Flags, { hasFlag } from 'country-flag-icons';
import Flag from 'country-flag-icons/react/3x2';
import { usePathname } from 'next/navigation';

export default function SearchCity() {
    const {
        values, functions, handlers, utilities
    } = useContext(AppContext);

    return (
        <React.Fragment>
            {/* Search DropDown */}
            <Combobox value={values.selectedCity} onChange={handlers.handleSelection}>
                <div className="relative flex w-full items-center">
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
                            <Combobox.Input
                                type="text"
                                className="block w-full rounded-3xl border border-slate-300 outline-none bg-slate-50 px-5 py-2.5 pl-14 text-sm text-slate-900 focus:border-amber-500 focus:ring-amber-500  dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder-slate-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                                placeholder="Search City..."
                                required
                                autoComplete="off"
                                value={values.query}
                                displayValue={(selected: typeof values.selectedCity) => {
                                    if (selected) {
                                        return selected.mainText;
                                    } else {
                                        return '';
                                    }
                                }}
                                onChange={handlers.handleSearch}
                            />
                            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform rounded-3xl border border-slate-200 bg-slate-100/50 px-2 py-1 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                                ⌘ K
                            </kbd>
                        </div>
                        <Combobox.Button
                            type='button'
                            className="ml-2 rounded-3xl border border-amber-600 bg-amber-500 p-2.5 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none dark:bg-amber-500 dark:hover:bg-amber-600"
                        >
                            <SearchNormal
                                className="h-5 w-5"
                                color="currentColor"
                                variant="TwoTone"
                            />
                            <span className="sr-only">Search</span>
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => functions.setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 top-full w-full overflow-auto text-base sm:text-sm z-50 p-2 gap-1 origin-top-right bg-slate-50 rounded-xl shadow-2xl focus:outline-none dark:bg-slate-900 dark:divide-slate-700 flex flex-col sm:right-auto sm:left-0 border border-slate-300 dark:border-slate-600">
                            {
                                !values.isLoading ?
                                    (
                                        <>
                                            {values.queryCities.length === 0 ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-slate-700 dark:text-slate-200">
                                                    No results found.
                                                </div>
                                            ) : (
                                                values.queryCities.map((city) => (
                                                    <Combobox.Option
                                                        key={city.id}
                                                        className={({ active }) =>
                                                            `relative inline-flex justify-start items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white ${active ? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-50' : 'dark:bg-none dark:text-slate-200 dark:hover:text-white dark:hover:bg-amber-500'}`
                                                        }
                                                        value={city}
                                                    >
                                                        {({ selected, active }) => (
                                                            <CityOption
                                                                city={city}
                                                                selected={selected}
                                                                active={active}
                                                            />
                                                        )}
                                                    </Combobox.Option>
                                                ))
                                            )}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <div className="relative cursor-default select-none py-2 px-4 text-slate-700 dark:text-slate-200">
                                                Loading...
                                            </div>
                                        </>
                                    )
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </React.Fragment>
    )
}


const CityOption = ({ city, selected, active }: { city: CityType; selected: boolean; active: boolean }) => {
    const Code = city.countryCode;
    interface FlagType {
        [key: string]: any;
    }

    const FlagIcon: any = (Flag as FlagType)[Code];

    return (
        <>
            {hasFlag(city.countryCode) ? (
                <FlagIcon className="h-5 w-5" color="currentColor" variant="TwoTone" />
            ) : (
                <span className="h-5 w-5">{city.countryCode}</span>
            )}
            <span className='flex flex-row items-baseline justify-start gap-2 h-full'>
                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{city.mainText}</span>
                <span className="block truncate text-slate-500 dark:text-slate-400 font-normal text-xs">{city.secondaryText}</span>
            </span>
        </>
    );
};