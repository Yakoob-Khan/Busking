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
import { fetchEvents } from '../actions';

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
          center={{
            lat: 12.3,
            lng: 43.2,
          }}
          zoom={2}
        >
          {this.renderEvents()}
          <InfoWindow className="info-window" marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
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
          </InfoWindow>
        </Map>
      );
    }
}

const mapStateToProps = state => (
  {
    events: state.events.allEvents,
  }
);

// eslint-disable-next-line new-cap
const WrappedMapView = GoogleApiWrapper({
  apiKey: 'AIzaSyCwOLP5P_hRzjqK5SrdZNviwXf3QyCJJBg',
})(MapView);

export default withRouter(connect(mapStateToProps, { fetchEvents })(WrappedMapView));