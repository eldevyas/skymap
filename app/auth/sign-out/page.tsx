import React from 'react'
import LogoutInterface from './interface/LogoutInterface'
import { getServerSession } from 'next-auth';



export default async function LogoutPage() {
    const session = await getServerSession();

    if (!session) {
        return {
            redirect: {
                destination: '/auth/sign-in',
                permanent: false
            }
        }
    }

    return (
        <React.Fragment>
            <LogoutInterface />
        </React.Fragment>
    )
}
