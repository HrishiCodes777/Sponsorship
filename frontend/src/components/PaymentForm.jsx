import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"

export default function PaymentForm() {
    const { addPayment } = useContext(AppContext);

    const [paymentData, setPaymentData] = useState({
        contractId: '',
        paymentDate: '',
        amountPaid: '',
        paymentStatus: 'Pending'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addPayment(paymentData);
        setPaymentData({
            contractId: '',
            paymentDate: '',
            amountPaid: '',
            paymentStatus: 'Pending'
        });
        alert('Payment added');
    };

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
                <label htmlFor="amountPaid">Payment Amount</label>
                <input type="number" step="any" id="amountPaid" name="amountPaid" value={paymentData.amountPaid} onChange={handleChange} required />
            </div>
            <div className="form-input">
                <label htmlFor="paymentStatus">Payment Status</label>
                <select id="paymentStatus" name="paymentStatus" value={paymentData.paymentStatus} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <input type="submit" className="submit-button" value="Add Payment" />
        </form>
    )
}
