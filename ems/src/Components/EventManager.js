import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventManager.css';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    category: '',
    date: '',
    price: '',
    description: ''
  });
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/events/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({
        name: '',
        category: '',
        date: '',
        price: '',
        description: ''
      });
      fetchStats();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  return (
    <div className="event-manager">
      <h2>Event Manager</h2>
      <div className="event-form">
        <h3>Add New Event</h3>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleInputChange}
        />
        <select name="category" value={newEvent.category} onChange={handleInputChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Ticket Price"
          value={newEvent.price}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={newEvent.description}
          onChange={handleInputChange}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>

      <div className="event-list">
        <h3>Existing Events</h3>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h4>{event.name}</h4>
              <p>Category: {event.category}</p>
              <p>Date: {event.date}</p>
              <p>Price: ${event.price}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="event-stats">
        <h3>Event Statistics</h3>
        <ul>
          {stats.map((stat) => (
            <li key={stat.eventId}>
              <p>Event: {stat.eventName}</p>
              <p>Tickets Sold: {stat.ticketsSold}</p>
              <p>Visitors: {stat.visitors}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventManager;
