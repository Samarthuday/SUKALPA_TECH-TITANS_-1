import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:5001/api/events');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="container">
      <h2>Event Schedule</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
            <p>Type: {event.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
