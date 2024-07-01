import React, { useState } from 'react';
import axios from 'axios'; // Use axios for making HTTP requests

const PaymentForm = () => {
    const [token, setToken] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMessage, setPaymentMessage] = useState('');

    const handlePayment = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/payment', { token, amount });
            setPaymentMessage(response.data.message);
            // Optionally, handle success response
        } catch (error) {
            setPaymentMessage(`Payment failed: ${error.message}`);
            // Optionally, handle error response
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

                <button type="submit">Pay</button>
            </form>
            <p>{paymentMessage}</p>
        </div>
    );
};

export default PaymentForm;
