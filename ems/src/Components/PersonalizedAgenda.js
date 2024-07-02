import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import AttendeeProfile from './AttendeeProfile';
import './PersonalizedAgenda.css';

const PersonalizedAgenda = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const [visibleSection, setVisibleSection] = useState('');
  const [form, setForm] = useState({
    name: '',
    date: '',
    note: '',
    eventNotes: {}
  });
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axiosInstance.get('http://localhost:5001/api/events');
      setEvents(response.data);
    };

    const fetchAttendees = async () => {
      const response = {};//await axiosInstance.get('http://localhost:5001/api/auth/attendees');
      //setAttendees(response.data);
    };

    fetchEvents();
    fetchAttendees();
  }, []);

  useEffect(() => {
    const fetchMatchmaking = async () => {
      const response = {};//await axiosInstance.post('http://localhost:5001/api/auth/matchmaking', { attendees });
      //setSuggestedConnections(response.data);
    };

    fetchMatchmaking();
  }, [attendees]);

  const toggleEventSelection = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const showSection = (section) => {
    setVisibleSection(visibleSection === section ? '' : section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEventNoteChange = (eventId, note) => {
    setForm({
      ...form,
      eventNotes: {
        ...form.eventNotes,
        [eventId]: note
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(form);
  };

  const eventsForSelectedDate = events.filter(event => {
    const eventDate = new Date(event.startTime).toLocaleDateString();
    return eventDate === new Date(form.date).toLocaleDateString();
  });

  const groupAttendeesByEvent = () => {
    const eventMap = {};
    suggestedConnections.forEach(attendee => {
      attendee.events.forEach(eventId => {
        if (!eventMap[eventId]) {
          eventMap[eventId] = [];
        }
        eventMap[eventId].push(attendee);
      });
    });
    return eventMap;
  };

  const groupedAttendees = groupAttendeesByEvent();

  return (
    <div className="container">
      <div className="buttons">
        <button onClick={() => showSection('personalized-agenda')}>Build Your Personalized Agenda</button>
        <button onClick={() => showSection('selected-events')}>Your Selected Events</button>
        <button onClick={() => showSection('suggested-connections')}>Suggested Connections</button>
      </div>
      {visibleSection === 'personalized-agenda' && (
        <div id="personalized-agenda" className="section">
          <h2>Build Your Personalized Agenda</h2>
          <div className="form-and-details">
            <form onSubmit={handleSubmit} className="agenda-form">
              <label>
                Name:
                <input type="text" name="name" value={form.name} onChange={handleInputChange} />
              </label>
              <label>
                Date:
                <input type="date" name="date" value={form.date} onChange={handleInputChange} />
              </label>
              <h3>Events for that day:</h3>
              <ul>
                {eventsForSelectedDate.map(event => (
                  <li key={event._id}>
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <p>{new Date(event.date).toLocaleString()} - {new Date(event.duration).toLocaleString()}</p>
                    <p>Type: {event.type}</p>
                    <input 
                      type="text" 
                      placeholder="Add note for this event" 
                      value={form.eventNotes[event._id] || ''} 
                      onChange={(e) => handleEventNoteChange(event._id, e.target.value)} 
                    />
                    <button type="button" onClick={() => toggleEventSelection(event._id)}>
                      {selectedEvents.includes(event._id) ? 'Remove from Agenda' : 'Add to Agenda'}
                    </button>
                  </li>
                ))}
              </ul>
              <label>
                Kind note:
                <textarea name="note" value={form.note} onChange={handleInputChange}></textarea>
              </label>
              <button type="submit">Submit</button>
            </form>
            {submittedData && (
              <div className="submitted-data">
                <h3>Submitted Details:</h3>
                <p><strong>Name:</strong> {submittedData.name}</p>
                <p><strong>Date:</strong> {submittedData.date}</p>
                <p><strong>Note:</strong> {submittedData.note}</p>
                <h4>Event Notes:</h4>
                <ul>
                  {Object.keys(submittedData.eventNotes).map(eventId => {
                    const event = events.find(e => e._id === eventId);
                    return (
                      <li key={event._id}>
                        <p><strong>{event.name}:</strong> {submittedData.eventNotes[eventId]}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {visibleSection === 'selected-events' && (
        <div id="selected-events" className="section">
          <h2>Your Selected Events</h2>
          <ul>
            {selectedEvents.map(eventId => {
              const event = events.find(e => e._id === eventId);
              return (
                <li key={event._id}>
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <p>{new Date(event.date).toLocaleString()} - {new Date(event.duration).toLocaleString()}</p>
                  <p>Type: {event.type}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {visibleSection === 'suggested-connections' && (
        <div id="suggested-connections" className="section">
          <h2>Suggested Connections</h2>
          {Object.keys(groupedAttendees).map(eventId => {
            const event = events.find(e => e._id === eventId);
            return (
              <div key={eventId}>
                <h3>{event?.name}</h3>
                <ul>
                  {groupedAttendees[eventId].map(attendee => (
                    <li key={attendee._id}>
                      <AttendeeProfile attendee={attendee} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PersonalizedAgenda;