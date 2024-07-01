import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import './AddEvent.css';
import banner from './event.avif'

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [type, setType] = useState('Session');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('http://localhost:5001/api/events', {
        title,
        description,
        location,
        startTime,
        endTime,
        type
      });

      if (response.status === 201) {
        alert('Event created successfully');
        setTitle('');
        setDescription('');
        setLocation('');
        setStartTime('');
        setEndTime('');
        setType('Session');
      } else {
        alert('Failed to create event: ' + response.data.message);
      }
    } catch (error) {
      console.error('Event creation error:', error);
      alert('An error occurred during event creation. Please try again.');
    }
  };

  return (
    <div className="full-screen">
      <div className='login-section'>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="Session">Session</option>
            <option value="Workshop">Workshop</option>
            <option value="Keynote">Keynote</option>
          </select>
        </div>
        <button type="submit">Add Event</button>
      </form>
      </div>
      <div className='image-section'>
      <img src={banner} alt="Background Image"></img>
      </div>
    </div>
  );
};

export default AddEvent;
