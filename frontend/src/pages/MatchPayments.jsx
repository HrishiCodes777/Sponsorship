import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Table from "../components/reusable/Table";

export default function MatchPayments() {
    const { matchPayments, error } = useContext(AppContext);
    const columns = ['Match Name', 'Match Date', 'Match Location','Total Payment']
    
    if (error.matchPayments) {
        return <div>Error: {error.matchPayments}</div>;
    }

    return (
        <div>
            <h2>Match Payments</h2>
            <Table columns={columns} data={matchPayments}/>
        </div>
    );
}
