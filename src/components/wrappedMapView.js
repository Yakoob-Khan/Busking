/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';
import { connect } from 'react-redux';
import {
  withRouter, NavLink, BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import moment from 'moment';
import { fetchEvents, getCurrentLocation } from '../actions';

export class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, // Hides or the shows the infoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedEvent: {}, // Shows the infoWindow to the selected Event upon a marker
    };
    // this.getBounds = this.getBounds.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents();
    this.props.getCurrentLocation();
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedEvent: props.event,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };


  renderEvents = () => {
    const now = new Date();
    // const events = this.props.events.filter(event => (moment(event.endTime).valueOf() > now.getTime()));
    // const events = this.props.events.filter(event => (moment(event.endTime).valueOf() > now.getTime()));
    if (this.props.events.filter(event => (moment(event.endTime).valueOf() > now.getTime())).length !== 0) {
      return this.props.events.filter(event => (moment(event.endTime).valueOf() > now.getTime())).map((event) => {
        return (
          <Marker key={event.id} event={event} position={{ lat: event.latitude, lng: event.longitude }} onClick={this.onMarkerClick} />
        );
      });
    } else {
      return (
        <div />
      );
    }
  }

  renderUserMarker() {
    if (this.props.user) {
      return (
        <Marker
          title="Your current location"
          position={this.props.currentUserLocation}
          icon={{
            url: `${this.props.user.photo}`,
            anchor: new window.google.maps.Point(32, 32),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      );
    } else {
      return (
        <Marker
          title="Your current location"
          position={this.props.currentUserLocation}
          icon={{
            url: 'https://www.shareicon.net/data/2015/08/14/85301_public_512x512.png',
            anchor: new window.google.maps.Point(32, 32),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Map className="map-container"
          google={this.props.google}
          center={this.props.currentUserLocation}
          // bounds={this.getBounds()}
          zoom={6}
        >
          {this.renderEvents()}
          {this.renderUserMarker()}
          <InfoWindow className="info-window" marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
            <div className="info-container">
              <div key={this.state.selectedEvent.id}>
                <p className="event-title-info">
                  {this.state.selectedEvent.title}
                </p>
                {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
                <Ratings
                  rating={this.state.selectedEvent.averageRating}
                  widgetRatedColors="#0099CC"
                  widgetEmptyColors="#6B6B6B"
                  widgetSpacings="2px"
                  widgetDimensions="20px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
              </div>
              <Router>
                <NavLink to={`events/${this.state.selectedEvent.id}`} key={this.state.selectedEvent.id} className="info-window-view-detail">
                  view event page
                </NavLink>
              </Router>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.allEvents,
    currentUserLocation: state.users.currentUserLocation,
    user: state.auth.user,
  }
);

// return this.props.events.filter(event => (moment(event.endTime).valueOf() > now.getTime())).map((event) => {

// eslint-disable-next-line new-cap
const WrappedMapView = GoogleApiWrapper({
  apiKey: 'AIzaSyAE7HAvGXDK-LG6BfkEM0mgafvwo_Nda1Y',
})(MapView);

export default withRouter(connect(mapStateToProps, { fetchEvents, getCurrentLocation })(WrappedMapView));
