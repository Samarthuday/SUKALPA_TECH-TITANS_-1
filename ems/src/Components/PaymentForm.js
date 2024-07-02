import React, { useState } from 'react';
import { makePayment } from './Booking'; // Import makePayment function
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css'; // Import the CSS file
import img12 from './img-12.png'; // Import the image file

const PaymentForm = () => {
    const [token, setToken] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMessage, setPaymentMessage] = useState('');
    const navigate = useNavigate();

    const handlePayment = async (event) => {
        event.preventDefault();

        try {
            const paymentResponse = await makePayment((Math.random() + 1).toString(36).substring(7), amount, email);
            setPaymentMessage(`Success: ${paymentResponse.message}`);
            setToken('');
            setAmount('');
            setEmail('');
            navigate('/events');
        } catch (error) {
            setPaymentMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="main-container">
            <div className="image-container">
                {/* Use the imported image variable */}
                <img src={img12} alt="Description" />
            </div>
            <div className="payment-container">
                <h2>Payment</h2>
                <form className="payment-form" onSubmit={handlePayment}>
                    <label htmlFor="amount">Amount: {localStorage.getItem('amount')}</label>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <button type="submit">Pay</button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
