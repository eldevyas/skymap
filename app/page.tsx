"use client";

import { Menu } from '@headlessui/react'
import { PresentationChartBarIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import Colors from "tailwindcss/colors"
import NavBar from './components/navBar';
import Footer from './components/footer';
import React from 'react';
import { Dash, Element } from 'iconsax-react';
import SearchCity from './dashboard/interface/searchCity';
import Header from './components/header';

export default function Home() {
    return (
        <React.Fragment>
            <div
                className="mx-auto w-full max-w-7xl h-auto relative flex flex-col gap-4"
            >
                <SearchCity />
                <Header />
            </div>
        </React.Fragment>
    )
}
