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
        <div />
      );
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        center={this.props.currentUserLocation}
        zoom={15}
      >
        {this.renderEvents()}
        <Marker position={this.props.currentUserLocation} onClick={this.onMarkerClick} />
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
            <div>
              <Router>
                <NavLink to={`events/${this.state.selectedEvent.id}`} key={this.state.selectedEvent.id} className="more">
                  MORE
                </NavLink>
              </Router>
            </div>
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
  }
);

// eslint-disable-next-line new-cap
const WrappedMapView = GoogleApiWrapper({
  apiKey: 'AIzaSyArATJi0Oo2tXNtsaFq0l3mySoMg0QuaSU',
})(MapView);

export default withRouter(connect(mapStateToProps, { fetchEvents, getCurrentLocation })(WrappedMapView));
