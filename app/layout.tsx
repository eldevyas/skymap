import './globals.css'
import type { Metadata }
    from 'next'
import {
    Merriweather_Sans
} from 'next/font/google'
import Provider from './provider';
import Footer from './components/footer';
import NavBar from './components/navBar';

const FontFamily = Merriweather_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SkyMap - Weather Forecast',
    description: 'Weather forecast for the next 24 hours.',
    keywords: 'weather, forecast, rain, snow, sun, cloud, wind, humidity, pressure, temperature, sky, map, skymap, sky map',
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
