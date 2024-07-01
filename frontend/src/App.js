import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'components/Home';
import Login from 'components/Login';
import Signup from 'components/Signup';
import EventList from 'components/EventList';
import AddEvent from 'components/AddEvent';
import PersonalizedAgenda from 'components/PersonalizedAgenda';

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
