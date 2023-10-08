import { getServerSession } from "next-auth";
import React from "react";
import DashboardInterface from "./DashboardInterface";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession();

    if (!session) {
        return redirect("/auth/sign-in");
    }

    return (
        <React.Fragment>
            <DashboardInterface />
        </React.Fragment>
    );
}
