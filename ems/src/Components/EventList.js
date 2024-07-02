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
        const response = await axiosInstance.get('http://192.168.1.106:5001/api/events');
        const fetchedEvents = response.data;

        if (Array.isArray(fetchedEvents)) {
          setEvents(fetchedEvents);
          localStorage.setItem('events', JSON.stringify(fetchedEvents)); // Store events in local storage
        } else {
          console.error('Fetched data is not an array:', fetchedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Check if events are already in local storage
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents && Array.isArray(storedEvents)) {
      setEvents(storedEvents);
    } else {
      fetchEvents();
    }
  }, []);

  const handleEventClick = (event_title, eventId) => {
    localStorage.setItem("event_title", event_title);
    localStorage.setItem('event_id', eventId);
    navigate(`/EventRegistrationForm/`); // Navigate to registration form with eventId
  };

  return (
    <div className="container">
      <h2>Event Schedule</h2>
      <ul>
        {events.map(event => (
          <li key={event._id} onClick={() => handleEventClick(event.title, event._id)} style={{ cursor: 'pointer' }}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
            <p>Type: {event.type}</p>
            <p>Price: ${event.price}</p> {/* Display price for each event */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
