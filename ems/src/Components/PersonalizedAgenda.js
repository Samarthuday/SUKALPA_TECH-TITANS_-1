import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import './PersonalizedAgenda.css';

const PersonalizedAgenda = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axiosInstance.get('http://localhost:5001/api/events');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const toggleEventSelection = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  return (
    <div className="container">
      <h2>Build Your Personalized Agenda</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
            <p>Type: {event.type}</p>
            <button onClick={() => toggleEventSelection(event._id)}>
              {selectedEvents.includes(event._id) ? 'Remove from Agenda' : 'Add to Agenda'}
            </button>
          </li>
        ))}
      </ul>
      <h2>Your Selected Events</h2>
      <ul>
        {selectedEvents.map(eventId => {
          const event = events.find(e => e._id === eventId);
          return (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
              <p>Type: {event.type}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PersonalizedAgenda;
