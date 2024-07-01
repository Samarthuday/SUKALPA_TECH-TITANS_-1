// import React, { useState } from 'react';
// import axiosInstance from '../api/axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3'); // Replace with your Stripe publishable key

// function RegistrationForm() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [ticketType, setTicketType] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Calculate the amount based on the ticket type
//     let amount;
//     switch (ticketType) {
//       case 'Early Bird':
//         amount = 5000; // $50.00
//         break;
//       case 'VIP':
//         amount = 10000; // $100.00
//         break;
//       case 'Group':
//         amount = 30000; // $300.00
//         break;
//       default:
//         amount = 5000; // Default to Early Bird price
//     }

//     const { error, token } = await stripe.createToken(elements.getElement(CardElement));

//     if (!error) {
//       try {
//         const paymentResponse = await axiosInstance.post('http://localhost:5001/api/registration/payment', {
//           token,
//           amount
//         });

//         if (paymentResponse.status === 200) {
//           const registrationResponse = await axiosInstance.post('http://localhost:5001/api/registration', {
//             name,
//             email,
//             ticketType
//           });

//           if (registrationResponse.status === 200) {
//             alert('Registration and payment successful!');
//           } else {
//             alert('Registration successful, but there was an issue saving your details.');
//           }
//         } else {
//           alert('Payment failed. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error during payment process:', error);
//         alert('An error occurred during the payment process. Please try again.');
//       }
//     } else {
//       console.error('Stripe token creation error:', error);
//       alert('Payment information is invalid. Please check your details and try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Register for the Event</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Ticket Type:</label>
//           <select value={ticketType} onChange={(e) => setTicketType(e.target.value)} required>
//             <option value="Early Bird">Early Bird</option>
//             <option value="VIP">VIP</option>
//             <option value="Group">Group</option>
//           </select>
//         </div>
//         <div>
//           <label>Credit Card Details:</label>
//           <CardElement />
//         </div>
//         <button type="submit">Register and Pay</button>
//       </form>
//     </div>
//   );
// }

// export default function WrappedRegistrationForm() {
//   return (
//     <Elements stripe={stripePromise}>
//       <RegistrationForm />
//     </Elements>
//   );
// }
