import axios from "axios";
const API_BASE_URL = 'http://localhost:5241/api/Sponsorship';

export const getMatchSponsors = async (year) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/matches/sponsors-info?sponsorship_year=${year}`);
        if(response.status===200 && response.data){
            return response.data;
        }
    }
    catch(error){
        console.log(error.message);
    }
};

export const getMatchPayments = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/matches/payments-info`);
        if(response.status===200 && response.data){
            return response.data;
        }
    }
    catch(error){
        console.log(error.message);
    }
};

export const getSponsorPayments = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/sponsors/payments-info`);
        if(response.status===200 && response.data){
            return response.data;
        }
    }
    catch(error){
        console.log(error.message);
    }
};

export const createPayment = async (payment) => {
    try{
        console.log('Sending payment data:', payment);
        const response = await axios.post(`${API_BASE_URL}/add-payment`, payment);
        if(response.status === 201 && response.data){
            console.log('Payment added successfully');
            return response.data;
        }
    }
    catch(error){
        console.log(error.message);
    }
}