/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEvent, getCurrentLocation } from '../actions';

export class EventMap extends Component {
  directionsService = new this.props.google.maps.DirectionsService();

  directionsDisplay = new this.props.google.maps.DirectionsRenderer();

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, // Hides or the shows the infoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedEvent: {}, // Shows the infoWindow to the selected Event upon a marker
      currentMode: 'DRIVING',
    };
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
    this.props.getCurrentLocation();
    const map1stWrapper = document.getElementById('map-wrapper').firstChild;
    if (map1stWrapper) {
      map1stWrapper.style.height = '100%';
    }
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

  renderEvent = () => {
    if (this.props.event) {
      const event = this.props.event;
      return (
        <Marker key={event.id} event={event} position={{ lat: event.latitude, lng: event.longitude }} onClick={this.onMarkerClick} />
      );
    } else {
      return (
        <div />
      );
    }
  }

  isObjectEmpty = (object) => {
    // empty object check adapted from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    return Object.entries(object).length === 0 && object.constructor === Object;
  }

  // Adapted from https://developers.google.com/maps/documentation/javascript/directions
  calcRoute = () => {
    const start = this.props.currentUserLocation;
    const end = { lat: this.props.event.latitude, lng: this.props.event.longitude };
    const request = {
      origin: start,
      destination: end,
      travelMode: this.state.currentMode,
    };

    if (window.map) {
      this.directionsDisplay.setMap(window.map.map);
      this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    }

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(result);
      }
    });
  }

  makeVisible = () => {
    const map2ndWrapper = document.getElementById('directions');
    if (map2ndWrapper) {
      map2ndWrapper.firstChild.style.width = '70%';
      map2ndWrapper.firstChild.style.height = '80%';
      map2ndWrapper.firstChild.style.position = 'relative';
    }
  }

  onModeChange = (event) => {
    this.setState({ currentMode: event.target.value });
  }

  render() {
    const event = this.props.event;
    const userLoc = this.props.currentUserLocation;
    if (!this.isObjectEmpty(event) && !this.isObjectEmpty(userLoc)) {
      return (
        <div id="map-3rd-wrapper">
          <div>
            <h3>Get Directions!</h3>
            <div id="floating-panel">
              <b>Mode of Travel: </b>
              <select id="mode" onChange={this.onModeChange}>
                <option value="DRIVING">Driving</option>
                <option value="WALKING">Walking</option>
                <option value="BICYCLING">Bicycling</option>
                <option value="TRANSIT">Transit</option>
              </select>
            </div>
          </div>
          <div id="directions">
            {this.makeVisible()}
            <Map
              // Adapted from https://github.com/tomchentw/react-google-maps/issues/189
              ref={(map) => { window.map = map; }}
              google={this.props.google}
              center={this.props.currentUserLocation}
            >
              {this.calcRoute()}
              {this.renderEvent()}

              <Marker
                title="Your position"
                position={this.props.currentUserLocation}
                icon={{
                  url: '/src/assets/placeholder.png',
                  anchor: new window.google.maps.Point(32, 32),
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
              />
              <InfoWindow className="info-window" marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
                <div>
                  <div key={this.state.selectedEvent.id}>
                    <p className="event-title-info">
                      {this.state.selectedEvent.title}
                    </p>
                  </div>
                </div>
              </InfoWindow>
            </Map>
            <div id="directionsPanel" />
          </div>
        </div>
      );
    } else {
      return <div className="directions">Loading...</div>;
    }
  }
}

const mapStateToProps = state => (
  {
    event: state.events.event,
    currentUserLocation: state.users.currentUserLocation,
  }
);

// eslint-disable-next-line new-cap
const WrappedEventMap = GoogleApiWrapper({
  apiKey: 'AIzaSyAE7HAvGXDK-LG6BfkEM0mgafvwo_Nda1Y',
})(EventMap);

export default withRouter(connect(mapStateToProps, { fetchEvent, getCurrentLocation })(WrappedEventMap));
