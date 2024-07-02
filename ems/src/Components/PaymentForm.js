import React, { useState } from 'react';
import { makePayment } from './Booking'; // Import makePayment function
import './PaymentForm.css'; // Import the CSS file
import img12 from './img-12.png'; // Import the image file

const PaymentForm = () => {
    const [token, setToken] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMessage, setPaymentMessage] = useState('');

    const handlePayment = async (event) => {
        event.preventDefault();

        try {
            const paymentResponse = await makePayment(token, amount, email);
            setPaymentMessage(`Success: ${paymentResponse.message}`);
            setToken('');
            setAmount('');
            setEmail('');
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
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <button type="submit">Pay</button>
                </form>
                <p className={`payment-message ${paymentMessage.startsWith('Success') ? 'success' : 'error'}`}>
                    {paymentMessage}
                </p>
            </div>
        </div>
    );
};

export default PaymentForm;
