import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Table from "../components/reusable/Table";

export default function MatchSponsors() {
    const { matchSponsors, error } = useContext(AppContext);

    const columns = [
        { label: 'Sponsor Name', key: 'sponsorName' },
        { label: 'Industry', key: 'industryType' },
        { label: 'No Of Matches', key: 'noOfMatches' },
    ];

    if (error.matchSponsors) {
        return <div>Error: {error.matchSponsors}</div>;
    }

    return (
        <div>
            <h2>Match Sponsors</h2>
            <Table columns={columns} data={matchSponsors}/>
        </div>
    );
}
