import React from 'react';
import './AttendeeProfile.css';

const AttendeeProfile = ({ attendee }) => {
  return (
    <div className="attendee-profile">
      <h3>{attendee.name}</h3>
      <p>Interests: {attendee.interests.join(', ')}</p>
      <p>Professional Background: {attendee.professionalBackground}</p>
    </div>
  );
};

export default AttendeeProfile;
