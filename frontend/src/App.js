import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import EventList from './Components/EventList';
import AddEvent from './Components/AddEvent';
import PersonalizedAgenda from './Components/PersonalizedAgenda';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/events" component={EventList} />
          <Route path="/add-event" component={AddEvent} />
          <Route path="/personalized-agenda" component={PersonalizedAgenda} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
