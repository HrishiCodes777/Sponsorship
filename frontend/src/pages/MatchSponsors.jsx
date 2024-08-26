import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Table from "../components/reusable/Table";

export default function MatchSponsors() {
    const { matchSponsors, error } = useContext(AppContext);

    const columns = ['Sponsor Name','Industry','No of Matches'];

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
