import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Components/Login'
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './Components/Signup';
import AddEvent from './Components/AddEvent';
import EventList from './Components/EventList';
import WrappedRegistrationForm from './Components/RegistrationForm';
import PersonalizedAgenda from './Components/PersonalizedAgenda';
import HomePage from './Components/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/addevent",
    element: <AddEvent />,
  },
  {
    path: "/events",
    element: <EventList />,
  },
  {
    path: "/registrationform",
    element: <WrappedRegistrationForm />,
  },
  {
    path: "/personalizedagenda",
    element: <PersonalizedAgenda />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
