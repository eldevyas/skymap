import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Location, SearchNormal } from "iconsax-react";
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { createClient } from '@google/maps';
import axios from 'axios';
import AppContext from '@/app/context';
import toast from 'react-hot-toast';
import Flags, { hasFlag } from 'country-flag-icons';
import Flag from 'country-flag-icons/react/3x2';


type City = {
    id: number,
    mainText: string,
    secondaryText: string,
    countryCode: string,
    latitude: number,
    longitude: number,
}

export default function SearchCity() {
    const { getters, setters, utils } = useContext(AppContext);

    // Create Maps Client
    const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4";

    const mapsClient = createClient({
        key: MAPS_API_KEY,
        Promise: Promise
    });

    // Cities List
    const [cities, setCities] = useState<City[]>([])

    // Query String Parameters
    const [query, setQuery] = useState('')

    // Selected City
    const [selected, setSelected] = useState(cities[0])

    const filteredCities =
        query === ''
            ? cities
            : cities.filter((city) => city.mainText?.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')));


    const handleSearch = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setQuery(event.target.value)

        // Fetch Cities with the Query
        const queryCities = await utils.fetchCitiesByQuery(event.target.value);

        setCities(queryCities);
    }

    const handleSelection = async (city: City) => {
        // Set Selected City
        setSelected(city);
        toast.success(`You've selected ${city.mainText}.`);
    }

    return (
        <React.Fragment>
            {/* Search DropDown */}
            <Combobox value={selected} onChange={handleSelection}>
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
                                className="block w-full rounded-3xl border border-slate-300 outline-none bg-slate-50 px-5 py-2.5 pl-14 text-sm text-slate-900 focus:border-sky-500 focus:ring-sky-500  dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
                                placeholder="Search City..."
                                required
                                displayValue={(selected: City) => {
                                    if (selected) {
                                        return selected.mainText;
                                    } else {
                                        return '';
                                    }
                                }}
                                onChange={handleSearch}
                            />
                            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform rounded-3xl border border-slate-200 bg-slate-100/50 px-2 py-1 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                                ⌘ K
                            </kbd>
                        </div>
                        <Combobox.Button
                            type='button'
                            className="ml-2 rounded-3xl border border-sky-700 bg-sky-700 p-2.5 text-sm font-medium text-white hover:bg-sky-800 focus:outline-none dark:bg-sky-600 dark:hover:bg-sky-700"
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
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 top-full w-full overflow-auto text-base sm:text-sm z-50 p-2 gap-1 origin-top-right bg-slate-50 rounded-xl shadow-2xl
        focus:outline-none dark:bg-slate-900 dark:divide-gray-700 flex flex-col
        sm:right-auto sm:left-0 border border-slate-300 dark:border-slate-600">
                            {filteredCities.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-slate-700 dark:text-slate-200">
                                    No results found.
                                </div>
                            ) : (
                                filteredCities.map((city) => (
                                    <Combobox.Option
                                        key={city.id}
                                        className={({ active }) =>
                                            `relative inline-flex justify-start items-baseline gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold hover:bg-sky-600 dark:hover:bg-sky-600 hover:text-white ${active ? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-50' : 'dark:bg-none dark:text-slate-200 dark:hover:text-white dark:hover:bg-sky-600'}`
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
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </React.Fragment>
    )
}


const CityOption = ({ city, selected, active }: { city: City; selected: boolean; active: boolean }) => {
    const Code: any = city.countryCode;
    interface FlagType {
        [key: string]: any;
    }

    const FlagIcon: any = (Flag as FlagType)[Code];

    return (
        <>
            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{city.mainText}</span>
            <span className="text-slate-500 dark:text-slate-400">{city.secondaryText}</span>
            <span className={`absolute inset-y-0 right-0 flex items-center pr-3 ${active ? 'text-white' : 'text-sky-600'}`}>
                {hasFlag(city.countryCode) ? (
                    <FlagIcon className="h-5 w-5" color="currentColor" variant="TwoTone" />
                ) : (
                    <span className="h-5 w-5">{city.countryCode}</span>
                )}
            </span>
        </>
    );
};