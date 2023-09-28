import React from 'react'
import NavBar from '../components/navBar'
import Footer from '../components/footer'

export default function DashboardLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div className="bg-slate-100 dark:bg-slate-900 h-full min-h-screen w-full flex flex-col gap-4 p-4">
            <NavBar />
            {children}
            <Footer />
        </div>
    )
}
