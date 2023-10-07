import './globals.css'
import type { Metadata }
    from 'next'
import {
    Merriweather_Sans
} from 'next/font/google'
import Provider from './provider';
import Footer from './components/footer';
import Colors from "tailwindcss/colors";
import { SessionProvider } from 'next-auth/react';
import { Session, getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';
import NavBar from './components/navBar';
import AuthProvider from './sessionProvider';
import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const FontFamily = Merriweather_Sans({ subsets: ['latin'] })



export const metadata: Metadata = {
    metadataBase: new URL('https://skymap.vercel.app/'),
    title: 'SkyMap - Weather Forecast',
    description: 'SkyMap is a weather forecast app that shows you the weather of any city in the world.',
    generator: 'Vercel',
    applicationName: 'SkyMap - Weather Forecast',
    referrer: 'origin-when-cross-origin',
    keywords: [
        'Weather',
        'Forecast',
        'SkyMap',
        'Weather Forecast',
        'Weather Forecast App',
        'Weather App',
        'Weather App Forecast',
    ],
    authors: [{
        name: 'Yassine Chettouch', url: "https://www.github.com/eldevyas"
    }],
    creator: 'Yassine Chettouch',
    publisher: 'Yassine Chettouch',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: '/svg/logo.svg',
        shortcut: '/apple-touch-icon.png',
        apple: '/apple-touch-icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/aapple-touch-iconapple-touch-icon.png',
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SkyMap - Weather Forecast',
        description: 'SkyMap is a weather forecast app that shows you the weather of any city in the world.',
        siteId: '1467726470533754880',
        creator: '@eldevyas',
        creatorId: '1467726470533754880',
        images: ['https://skymap.vercel.app/images/og-image.png'],
    },
    openGraph: {
        title: 'SkyMap - Weather Forecast',
        description: 'SkyMap is a weather forecast app that shows you the weather of any city in the world.',
        url: 'https://skymap.vercel.app/',
        siteName: 'SkyMap',
        images: [
            {
                url: 'https://skymap.vercel.app/images/og-image.png',
                width: 1280,
                height: 1280,
            },
            {
                url: 'https://skymap.vercel.app/images/hero.jpg',
                width: 3000,
                height: 2000,
                alt: 'Og Image Alt',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: Colors.red[600] },
        { media: '(prefers-color-scheme: dark)', color: Colors.red[600] },
    ],
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: 'https://skymap.vercel.app/manifest.json',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <head>
                <script src="https://kit.fontawesome.com/728612d1ce.js" crossOrigin="anonymous" async />
            </head>
            <body className={FontFamily.className}>
                <AuthProvider session={session}>
                    <Provider>
                        <div className="w-full flex flex-col gap-4 min-h-screen justify-between p-4">
                            {/* NavBar  */}
                            <NavBar />
                            <div className='w-full flex flex-col gap-4 flex-1 items-center justify-center'>
                                {children}
                            </div>
                            {/* Footer */}
                            <Footer />
                        </div>
                    </Provider>
                </AuthProvider>
            </body>
        </html >
    )
}
