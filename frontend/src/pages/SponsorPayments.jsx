import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Table from "../components/reusable/Table";

export default function SponsorPayments() {
    const { sponsorPayments, error } = useContext(AppContext);

    const columns = [
        { label: 'Sponsor Name', key: 'sponsorName' },
        { label: 'Industry', key: 'industryType' },
        { label: 'Total Payment', key: 'totalPayment' },
        { label: 'No Of Payments', key: 'noOfPayments' },
        { label: 'Payment-Date', key: 'paymentDate' }
    ];

    if (error.sponsorPayments) {
        return <div>Error: {error.sponsorPayments}</div>;
    }

    return (
        <div>
            <h2>Sponsor Payments</h2>
            <Table columns={columns} data={sponsorPayments}/>
        </div>
    );
}
