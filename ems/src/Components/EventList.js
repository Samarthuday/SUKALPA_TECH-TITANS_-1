import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5001/api/events');
        const fetchedEvents = response.data;
        
        if (Array.isArray(fetchedEvents)) {
          setEvents(fetchedEvents);
          // Store events in local storage
          // localStorage.setItem('events', JSON.stringify(fetchedEvents));
        } else {
          console.error('Fetched data is not an array:', fetchedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };


      fetchEvents();
  }, []);

  const handleEventClick = (event_title, eventId) => {
    localStorage.setItem("event_title", event_title);
    localStorage.setItem('event_id', eventId);
    navigate(`/EventRegistrationForm/`); // Navigate to registration form with eventId
  };

  return (
    <div className="page-container">
      <header className="header">
        <div className="logo">Tech-Titans</div>
      </header>
      <div className="content">
        <div className="container">
          <h2>Event Schedule</h2>
          <ul>
            {events.map(event => (
              <li key={event._id} onClick={() => handleEventClick(event.name, event._id)} style={{ cursor: 'pointer' }}>
                <h3>{event.name}</h3>
                <p>{new Date(event.date).toLocaleString()}</p>
                <p>Type: {event.type}</p>
                <p>${event.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="footer">
        &copy; 2024 Tech-Titans. All rights reserved.
      </footer>
    </div>
  );
};

export default EventList;
