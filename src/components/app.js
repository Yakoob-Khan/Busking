import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import '../style.scss';
import Events from './events';
import NewEvent from './NewEvent';
import Event from './event';
import NavBar from './NavBar';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Landing from './Landing';
import MapView from './mapView';
// import UserProfile from './userprofile';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/events" component={Events} />
          <Route path="/createEvent" component={NewEvent} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/mapView" component={MapView} />

          <Route exact path="/events/:eventId" component={Event} />
          {/* <Route path="/payment" component={CheckoutForm} /> */}
          {/* <Route exact path="/user" component={UserProfile} /> */}
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
