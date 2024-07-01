import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import EventList from './Components/EventList';
import AddEvent from './Components/AddEvent';
import PersonalizedAgenda from './Components/PersonalizedAgenda';

function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/events">Event List</Link>
            </li>
            <li>
              <Link to="/add-event">Add Event</Link>
            </li>
            <li>
              <Link to="/personalized-agenda">Personalized Agenda</Link>
            </li>
          </ul>
        </nav>

      </div>
  );
}

export default App;