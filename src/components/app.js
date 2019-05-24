/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
// eslint-disable-next-line import/no-duplicates
} from 'react-router-dom';
import '../style.scss';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-duplicates
// import { withRouter } from 'react-router-dom';
import Events from './events';
import WrappedNewEvent from './newEvent';
import Event from './event';
import NavBar from './NavBar';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Landing from './Landing';
import WrappedMapView from './wrappedMapView';
import { facebookResponseLocal } from '../actions';
import requireAuth from './requireAuth';
import UserProfile from './userprofile';
// import UserProfile from './userprofile';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};
class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      console.log('local token');
      console.log(token);
      this.props.facebookResponseLocal(token);
    } else {
      console.log('no local token');
    }
  }

  // componentWillUpdate() {
  //   const token = localStorage.getItem('jwtToken');
  //   if (token) {
  //     console.log('local token');
  //     console.log(token);
  //     this.props.facebookResponseLocal(token);
  //   } else {
  //     console.log('no local token');
  //   }
  // }

  render() {
    return (
      <Router>
        <div id="main-child">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/events" component={Events} />
            <Route path="/createEvent" component={requireAuth(WrappedNewEvent)} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/mapView" component={WrappedMapView} />
            <Route exact path="/events/:eventId" component={Event} />
            <Route exact path="/users/:userId" component={UserProfile} />
            {/* <Route path="/payment" component={CheckoutForm} /> */}
            {/* <Route exact path="/user" component={UserProfile} /> */}
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default (connect(null, { facebookResponseLocal })(App));
