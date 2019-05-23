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
import { fetchEvents, getCurrentLocation } from '../actions';

export class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, // Hides or the shows the infoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedEvent: {}, // Shows the infoWindow to the selected Event upon a marker
    };
    this.getBounds = this.getBounds.bind(this);
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
    if (this.props.events.length !== 0) {
      return this.props.events.map((event) => {
        return (
          <Marker key={event.id} event={event} position={{ lat: event.latitude, lng: event.longitude }} onClick={this.onMarkerClick} />
        );
      });
    } else {
      return (
        <div>
          <Map className="map-container"
            google={this.props.google}
            center={{
              lat: 12.3,
              lng: 43.2,
            }}
            zoom={2}
          >
            {this.renderEvents()}
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
                    widgetSpacings="3px"
                    widgetDimensions="24px"
                  >
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                  </Ratings>
                </div>
                <div>
                  <Router>
                    <NavLink to={`events/${this.state.selectedEvent.id}`} key={this.state.selectedEvent.id} className="info-window-view-detail">
                      view event details
                    </NavLink>
                  </Router>
                </div>
              </div>
            </InfoWindow>
          </Map>
        </div>
      );
    }
  }

  getBounds = () => {
    const points = this.props.events.map(event => (
      { lat: event.latitude, lng: event.longitude }
    ));
    const userLoc = this.props.currentUserLocation;
    // empty object check adapted from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    if (!(Object.entries(userLoc).length === 0 && userLoc.constructor === Object)) {
      points.push(this.props.currentUserLocation);
    }
    const bounds = new this.props.google.maps.LatLngBounds();
    points.forEach((point) => {
      bounds.extend(point);
    });
    return bounds;
  }

  render() {
    return (
      <Map
        google={this.props.google}
        bounds={this.getBounds()}
        zoom={12}
      >
        {this.renderEvents()}
        <Marker
          title="Your current location"
          position={this.props.currentUserLocation}
          icon={{
            url: `${this.props.user.photo}`,
            anchor: new window.google.maps.Point(32, 32),
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
        <InfoWindow className="info-window" marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
          <div>
            <div key={this.state.selectedEvent.id}>
              <p className="event-title-info">
                {this.state.selectedEvent.title}
              </p>
              {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
              <Ratings
                rating={this.state.selectedEvent.averageRating}
                widgetRatedColors="rgb(255, 250, 0)"
                widgetDimensions="35px"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </div>
            <Router>
              <NavLink to={`events/${this.state.selectedEvent.id}`} key={this.state.selectedEvent.id} className="more">
                MORE
              </NavLink>
            </Router>
          </div>
        </InfoWindow>
      </Map>
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


// eslint-disable-next-line new-cap
const WrappedMapView = GoogleApiWrapper({
  apiKey: 'AIzaSyAE7HAvGXDK-LG6BfkEM0mgafvwo_Nda1Y',
})(MapView);

export default withRouter(connect(mapStateToProps, { fetchEvents, getCurrentLocation })(WrappedMapView));
