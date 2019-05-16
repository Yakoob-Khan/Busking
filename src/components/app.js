import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import '../style.scss';
import Events from './events';
import NewEvent from './newevent';
import Event from './event';
// import UserProfile from './userprofile';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/createevent">Create Event</NavLink></li>
        <li><NavLink to="/user">User</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
      </ul>
    </nav>
  );
};

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Events} />
          <Route path="/createevent" component={NewEvent} />
          <Route exact path="/events/:eventId" component={Event} />
          {/* <Route exact path="/user" component={UserProfile} /> */}
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
