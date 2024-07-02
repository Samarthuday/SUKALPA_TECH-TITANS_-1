import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { registerForEvent } from './Booking'; // Import registerForEvent function
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom'
import './EventRegistrationForm.css'; // Import the CSS file

const EventRegistrationForm = () => {
  const navigate = useNavigate();
  const eventId = localStorage.getItem('event_id');
  const eventTitle = localStorage.getItem('event_title');
  const [eventDetails, setEventDetails] = useState({});
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5001/api/events/${eventId}`);
        setEventDetails(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (!numberOfPeople || !firstName || !lastName) {
      setRegistrationMessage('All fields are required.');
      return;
    }

    try {
      await registerForEvent(eventId, numberOfPeople, firstName, lastName);
      localStorage.setItem('amount', eventDetails.price * numberOfPeople);
      setRegistrationMessage('You have successfully registered for the event!');
      setNumberOfPeople('');
      setFirstName('');
      setLastName('');
      navigate('/paymentform');
    } catch (error) {
      setRegistrationMessage(error.message);
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="logo">Tech-Titans</div>
      </header>
      <div className="row-content">
        <div className="event-details">
          <h2>{eventTitle}</h2>
          <p>{eventDetails.description}</p>
          <p>Start Time: {new Date(eventDetails.date).toLocaleString()}</p>
          <p>End Time: {new Date(eventDetails.duration).toLocaleString()}</p>
          <p>Type: {eventDetails.type}</p>
        </div>
        <div className="registration-form">
          <h2>Register for {eventTitle}</h2>
          <form onSubmit={handleRegistration}>
            <label htmlFor="numberOfPeople">Number of People:</label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
            />

            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

              <div className="price-details">
                <p>Price per Ticket: ${eventDetails.price}</p>
                <p>Total Amount: ${eventDetails.price * numberOfPeople}</p>
              </div>

            <button type="submit">Submit</button>
          </form>
          <p>{registrationMessage}</p>
        </div>
      </div>
      <footer className="footer">
        &copy; 2024 Tech-Titans. All rights reserved.
      </footer>
    </div>
  );
};

export default EventRegistrationForm;

