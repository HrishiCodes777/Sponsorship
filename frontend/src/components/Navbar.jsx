import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
    const { fetchMatchPayments, fetchMatchSponsors, fetchSponsorPayments } = useContext(AppContext);

    return (
        <div className="navbar">
            <Link to='/'>Home</Link>
            <Link to='/sponsors/payments-info' onClick={() => fetchSponsorPayments()}>
              Sponsor Payments
            </Link>
            <Link to='/matches/payments-info' onClick={() => fetchMatchPayments()}>
              Match Payments
            </Link>
            <Link to='/sponsors/matches-info' onClick={() => fetchMatchSponsors(2024)}>
              Match Sponsors
            </Link>
            <Link to='/add-payment'>
              Add Payment
            </Link>
        </div>
    );
}
