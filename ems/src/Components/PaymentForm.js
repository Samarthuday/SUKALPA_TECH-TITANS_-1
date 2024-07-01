import React, { useState } from 'react';
import { makePayment } from './Booking'; // Import makePayment function

const PaymentForm = () => {
    const [token, setToken] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMessage, setPaymentMessage] = useState('');

    const handlePayment = async (event) => {
        event.preventDefault();

        try {
            const paymentResponse = await makePayment(token, amount, email);
            setPaymentMessage(paymentResponse.message);
            // Optionally, reset form fields after successful payment
            setToken('');
            setAmount('');
            setEmail('');
        } catch (error) {
            setPaymentMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Payment</h2>
            <form onSubmit={handlePayment}>
                <label htmlFor="token">Token:</label>
                <input type="text" id="token" value={token} onChange={(e) => setToken(e.target.value)} />

                <label htmlFor="amount">Amount:</label>
                <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <button type="submit">Pay</button>
            </form>
            <p>{paymentMessage}</p>
        </div>
    );
};

export default PaymentForm;
