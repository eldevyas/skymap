import './globals.css'
import type { Metadata }
    from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader';
import Colors from "tailwindcss/colors"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SkyMap - Weather Forecast',
    description: 'Weather forecast for the next 24 hours.',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://skymap.vercel.app',
        images: [
            {
                url: 'https://skymap.vercel.app/og.png',
                alt: 'SkyMap - Weather Forecast',
                width: 1200,
                height: 630
            }
        ]
    },
}

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={
                inter.className
            }>
                <NextTopLoader
                    color={Colors.cyan[500]}
                    height={5}
                />
                {children}
            </body>
        </html>
    )
}
