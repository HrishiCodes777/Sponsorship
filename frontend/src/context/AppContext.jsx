import { createContext, useEffect, useState } from "react";
import { getMatchPayments, getSponsorPayments, getMatchSponsors, createPayment } from "../services/apiServices";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [matchPayments, setMatchPayments] = useState([]);
    const [matchSponsors, setMatchSponsors] = useState([]);
    const [sponsorPayments, setSponsorPayments] = useState([]);
    const [error, setError] = useState({ sponsorPayments: null, matchPayments: null, matchSponsors: null, payment:null });

    const fetchMatchPayments = async () => {
        try {
            const data = await getMatchPayments();
            setMatchPayments(data);
        } catch (error) {
            setError(prevError => ({ ...prevError, matchPayments: 'Failed to fetch Match Payments' }));
        }
    }

    const fetchSponsorPayments = async () => {
        try {
            const data = await getSponsorPayments();
            setSponsorPayments(data);
        } catch (error) {
            setError(prevError => ({ ...prevError, sponsorPayments: 'Failed to fetch Sponsor Payments' }));
        }
    }

    const fetchMatchSponsors = async (year) => {
        try {
            const data = await getMatchSponsors(year);
            setMatchSponsors(data);
        } catch (error) {
            setError(prevError => ({ ...prevError, matchSponsors: 'Failed to fetch Match Sponsors' }));
        }
    }

    const addPayment = async (payment) => {
        try{
            await createPayment(payment);
        } catch (error){
            console.log(error.message);
            setError(prevError => ({...prevError, payment: 'Failed to add payment' }));
        }
    }

    useEffect(() => {
        fetchMatchPayments();
        fetchSponsorPayments(); 
        fetchMatchSponsors(2024);
    }, []);

    return (
        <AppContext.Provider value={{ matchPayments, matchSponsors, sponsorPayments, fetchMatchPayments, fetchMatchSponsors, fetchSponsorPayments,addPayment, error }}>
            {children}
        </AppContext.Provider>
    );
}
