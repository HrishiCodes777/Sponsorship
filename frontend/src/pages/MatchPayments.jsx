import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Table from "../components/reusable/Table";

export default function MatchPayments() {
    const { matchPayments, error } = useContext(AppContext);
    const columns = [
        { label: 'Match Name', key: 'matchName' },
        { label: 'Match Date', key: 'matchDate' },
        { label: 'Match Location', key: 'matchLocation' },
        { label: 'Total Payment', key: 'totalPayment' }
    ];

    
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
