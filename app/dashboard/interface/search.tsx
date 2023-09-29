import React, { Fragment, useEffect, useState } from 'react'
import { SearchNormal } from "iconsax-react";
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {

    // Cities List
    const [cities, setCities] = useState<{
        id: number,
        name: string,
        country: string,
        lat: number,
        lng: number,
    }[]>([])

    // Query String Parameters
    const [query, setQuery] = useState('')

    // Selected City
    const [selected, setSelected] = useState(cities[0])

    const filteredCities =
        query === ''
            ? cities
            : cities.filter((city) =>
                city.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    // Fetch Cities List
    useEffect(() => {
        setCities([
            {
                id: 1,
                name: 'New York',
                country: 'United States',
                lat: 40.712776,
                lng: -74.005974,
            },
            {
                id: 2,
                name: 'London',
                country: 'United Kingdom',
                lat: 51.507351,
                lng: -0.127758,
            },
            {
                id: 3,
                name: 'Paris',
                country: 'France',
                lat: 48.856613,
                lng: 2.352222,
            },
        ])
    }, [])

    const handleSearch = () => {
        console.log(`Query: ${query}`)

        setQuery('')
    }

    return (
        <React.Fragment>
            {/* Search DropDown */}
            <Combobox value={selected} onChange={setSelected}>
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
                                displayValue={(city: any) => city.name}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform rounded-3xl border border-slate-200 bg-slate-100/50 px-2 py-1 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                                ⌘ K
                            </kbd>
                        </div>
                        <Combobox.Button
                            type='button'
                            className="ml-2 rounded-3xl border border-amber-700 bg-amber-700 p-2.5 text-sm font-medium text-white hover:bg-amber-800 focus:outline-none dark:bg-amber-600 dark:hover:bg-amber-700"
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
                        <Combobox.Options className="absolute mt-1 max-h-60 top-full w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                            {filteredCities.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredCities.map((city) => (
                                    <Combobox.Option
                                        key={city.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={city}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {city.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-amber-600'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
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
