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
        const response = await axiosInstance.get(`http://192.168.1.106:5001/api/events`);
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
    <div className="container">
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

        <button type="submit">Submit</button>
      </form>
      <p>{registrationMessage}</p>
    </div>
  );
};

export default EventRegistrationForm;
