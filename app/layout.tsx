import './globals.css'
import type { Metadata }
    from 'next'
import {
    Merriweather_Sans
} from 'next/font/google'
import Provider from './provider';
import Footer from './components/footer';
import NavBar from './components/navBar';
import Colors from "tailwindcss/colors";

const FontFamily = Merriweather_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL('https://skymap.vercel.app/'),
    title: 'SkyMap - Weather Forecast',
    description: 'SkyMap is a weather forecast app that shows you the weather of any city in the world.',
    keywords: 'weather, forecast, rain, snow, sun, cloud, wind, humidity, pressure, temperature, sky, map, skymap, sky map',
    openGraph: {
        title: 'SkyMap - Weather Forecast',
        description: 'SkyMap is a weather forecast app that shows you the weather of any city in the world.',
        url: 'https://skymap.vercel.app/',
        siteName: 'SkyMap',
        images: [
            {
                url: 'https://skymap.vercel.app/og-image.png',
                width: 1280,
                height: 1280,
            },
            {
                url: 'https://skymap.vercel.app/hero.jpg',
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

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={
                FontFamily.className
            }>
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
            </body>
        </html>
    )
}
