import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"

export default function PaymentForm() {
    const {addPayment} = useContext(AppContext);

    const [paymentData,setPaymentData] = useState({
        contractId: '',
        paymentDate: '',
        paymentAmount: '',
        paymentStatus: 'Pending'
    });

    const handleChange = (event) => {
        const {name,value} = event.target;
        setPaymentData({...paymentData, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addPayment(paymentData);
        setPaymentData({
            contractId: '',
            paymentDate: '',
            paymentAmount: '',
            paymentStatus: 'Pending'
        });
        alert('Payment added');
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-input">
                <label htmlFor="contractId">Contract ID</label>
                <input type="number" id="contractId" name="contractId" value={paymentData.contractId} onChange={handleChange} required />
            </div>
            <div className="form-input">
                <label htmlFor="paymentDate">Payment Date</label>
                <input type="date" id="paymentDate" name="paymentDate" value={paymentData.paymentDate} onChange={handleChange} required />
            </div>
            <div className="form-input">
                <label htmlFor="paymentAmount">Payment Amount</label>
                <input type="number" id="paymentAmount" name="paymentAmount" value={paymentData.paymentAmount} onChange={handleChange} required />
            </div>
            <div className="form-input">
                <label htmlFor="paymentStatus">Payment Status</label>
                <select id="paymentStatus" name="paymentStatus" value={paymentData.paymentStatus} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <input type="submit" className="submit-button" value="Add Payment"/>
        </form>
    )
}
