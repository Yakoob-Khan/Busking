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
      map: {},
    };
    this.map = React.createRef();
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
    this.props.getCurrentLocation();
    const map1stWrapper = document.getElementById('map-wrapper').firstChild;
    if (map1stWrapper) {
      map1stWrapper.style.width = '80%';
      map1stWrapper.style.margin = '0 auto';
    }
    this.setState({ map: window.map });
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
    if (!this.isObjectEmpty(this.props.currentUserLocation)) {
      const start = this.props.currentUserLocation;
      const end = { lat: this.props.event.latitude, lng: this.props.event.longitude };
      const request = {
        origin: start,
        destination: end,
        travelMode: this.state.currentMode,
      };
      this.directionsDisplay.setMap(this.state.map.map);
      this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
      this.directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(result);
        }
      });
    }
  }


  onModeChange = (event) => {
    this.setState({ currentMode: event.target.value });
  }

  iconUrl = () => {
    if (this.props.user) {
      return `${this.props.user.photo}`;
    } else {
      return 'https://www.shareicon.net/data/2015/08/14/85301_public_512x512.png';
    }
  }

  render() {
    const event = this.props.event;
    const userLoc = this.props.currentUserLocation;
    const mapStyle = {
      width: '90%',
      height: '350px',
      paddingRight: '22.15vw',
      borderTop: '1px dotted gray',
      borderBottom: '1px dotted gray',
      zIndex: '2',
    };
    let loading = null;
    if (this.isObjectEmpty(event) || this.isObjectEmpty(userLoc)) {
      loading = <p className="directions">Loading directions... </p>;
    }

    return (
      <div id="map-outermost-wrapper">
        <div>
          <h3 id="map-header">Directions to Event</h3>
          <div id="floating-panel">
            {loading}
            <p id="map-mode-select-label">Travel By</p>
            <select id="map-mode-select" onChange={this.onModeChange}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </select>
          </div>
        </div>
        <div id="directions">
          <Map
            // Adapted from https://github.com/tomchentw/react-google-maps/issues/189
            ref={(map) => { window.map = map; }}
            google={this.props.google}
            center={this.props.currentUserLocation}
            style={mapStyle}
          >
            {this.renderEvent()}
            {this.calcRoute()}
            <Marker
              title="Your current location"
              position={this.props.currentUserLocation}
              icon={{
                url: String(this.iconUrl()),
                anchor: new window.google.maps.Point(32, 32),
                scaledSize: new window.google.maps.Size(60, 60),
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
  }
}

const mapStateToProps = state => (
  {
    event: state.events.event,
    currentUserLocation: state.users.currentUserLocation,
    user: state.auth.user,
  }
);

// eslint-disable-next-line new-cap
const WrappedEventMap = GoogleApiWrapper({
  apiKey: 'AIzaSyAE7HAvGXDK-LG6BfkEM0mgafvwo_Nda1Y',
})(EventMap);

export default withRouter(connect(mapStateToProps, { fetchEvent, getCurrentLocation })(WrappedEventMap));
