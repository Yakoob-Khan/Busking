/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import { fetchEvents } from '../actions';

export class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, // Hides or the shows the infoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedPlace: {}, // Shows the infoWindow to the selected place upon a marker
    };
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

    onMarkerClick = (props, marker, e) => {
      this.setState({
        selectedPlace: props,
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
            <Marker key={event.id} averageRating={event.averageRating} name={event.title} position={{ lat: event.latitude, lng: event.longitude }} onClick={this.onMarkerClick} />
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
          zoom={8}
        >
          {this.renderEvents()}
          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
            <div>
              <div className="event">
                {/* <img
                alt="event-banner"
                src="https://upload.wikimedia.org/wikipedia/commons/9/97/Peoria_skyline_banner.jpg"
                id="event-banner"
              /> */}
                <p className="event-title">
                  {this.state.selectedPlace.name}
                </p>
                {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
                <Ratings
                  rating={this.state.selectedPlace.averageRating}
                  widgetRatedColors="rgb(255, 250, 0)"
                  widgetDimensions="35px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
                {/* <Link to={`events/${this.state.selectedPlace.key}`} key={this.state.selectedPlace.key} className="more-info">
                MORE
                </Link> */}
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
  }
);

// eslint-disable-next-line new-cap
const WrappedView = GoogleApiWrapper({
  apiKey: 'AIzaSyCwOLP5P_hRzjqK5SrdZNviwXf3QyCJJBg',
})(MapView);

export default withRouter(connect(mapStateToProps, { fetchEvents })(WrappedView));
