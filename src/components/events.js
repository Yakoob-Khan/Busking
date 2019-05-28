import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import { GoogleApiWrapper } from 'google-maps-react';
import moment from 'moment';
import EventSearch from './eventSearch';
import { fetchEvents, getCurrentLocation, updateStateEvents } from '../actions';
import WrappedMapView from './wrappedMapView';

class UnWrappedEvents extends Component {
  geocoder = new this.props.google.maps.Geocoder();

  constructor(props) {
    super(props);
    this.state = {
      mapBool: false,
      sortByTime: true,
    };

    this.onToggleMap = this.onToggleMap.bind(this);
    this.onToggleSort = this.onToggleSort.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }


  componentDidMount() {
    this.props.fetchEvents();
    this.props.getCurrentLocation();
    this.sortEventsTime();
    // console.log('wohoo!');
    // console.log(this.props.events);
  }

  onToggleMap(event) {
    this.setState(prevState => ({
      mapBool: !prevState.mapBool,
    }));
  }

  onToggleSort(event) {
    this.setState((prevState) => {
      if (prevState.sortByTime) {
        this.sortEventsLocation();
      } else {
        this.sortEventsTime();
      }
      return { sortByTime: !prevState.sortByTime };
    });
  }

  isObjectEmpty = (object) => {
    // empty object check adapted from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    return Object.entries(object).length === 0 && object.constructor === Object;
  }

  sortEventsLocation() {
    if (!this.isObjectEmpty(this.props.currentUserLocation)) {
      this.geocoder.geocode({ location: this.props.currentUserLocation }, (results, status) => {
        if (status === 'OK') {
          const userAddr = results[0].address_components;
          const needed = userAddr.filter((comp) => {
            return !comp.types.includes('street_number') && !comp.types.includes('postal_code');
          });
          const neededArr = needed.map(comp => comp.short_name);
          const uniqNeeded = [...new Set(neededArr)];
          const events = this.props.events;
          let sorted = [];
          uniqNeeded.forEach((uniq) => {
            events.forEach((event, index) => {
              if (event.address.includes(uniq)) {
                sorted.push(event);
                events.splice(index, 1);
              }
            });
          });
          sorted.sort((a, b) => {
            return new Date(a.startTime) - new Date(b.startTime);
          });
          events.sort((a, b) => {
            return new Date(a.startTime) - new Date(b.startTime);
          });
          console.log(sorted);
          sorted = [...sorted, ...events];
          this.props.updateStateEvents(sorted);
        }
      });
    }
  }

  sortEventsTime() {
    const events = this.props.events;
    events.sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime);
    });
    this.props.updateStateEvents(events);
  }

  renderEvents = () => {
    if (this.props.events.length !== 0) {
      const now = new Date();
      return this.props.events.filter(event => (moment(event.endTime).valueOf() > now.getTime())).map((event) => {
      // return this.props.events.map((event) => {
      //   console.log(moment(event.endTime).valueOf());
      //   console.log(now.getTime());
      //   console.log(moment(event.endTime).valueOf() > now.getTime());
        const eventStyle = {
          backgroundImage: `url(${event.imageURL})`,
        };
        return (
          <div className="event-container" key={event.id}>
            <Link className="view-details" key={event.id} to={`events/${event.id}`}>
              <div className="event" key={event.id} style={eventStyle} />
              <p className="event-title">
                {event.title}
              </p>
              <p className="event-description">
                {event.description}
              </p>
              <p className="event-address">
                {event.address}
              </p>

              {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
              <div className="event-rating">
                <Ratings
                  rating={event.averageRating}
                  widgetRatedColors="#0099CC"
                  widgetEmptyColors="#6B6B6B"
                  widgetSpacings="1px"
                  widgetDimensions="12px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
              </div>
            </Link>
          </div>
        );
      });
    } else {
      return (
        <div>
          No events yet
        </div>
      );
    }
  }

  render() {
    return (
      <div className="events-section">
        <p className="events-header" id="events-nearby">Events nearby</p>
        <p className="events-subheader">See what&apos;s happening now</p>
        <EventSearch />
        <div className="events-button-container">
          <button onClick={this.onToggleSort} className="events-toggle-sort" type="button">{this.state.sortByTime ? 'Sort by Time' : 'Sort by Location' }</button>
          <button onClick={this.onToggleMap} className="events-toggle" type="button">{this.state.mapBool ? 'Toggle Grid' : 'Toggle Map'}</button>
        </div>
        <div className="events-container">
          {this.state.mapBool ? <WrappedMapView /> : this.renderEvents()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.allEvents,
    currentUserLocation: state.users.currentUserLocation,
    state,
  }
);

// eslint-disable-next-line new-cap
const Events = GoogleApiWrapper({
  apiKey: 'AIzaSyAE7HAvGXDK-LG6BfkEM0mgafvwo_Nda1Y',
})(UnWrappedEvents);

export default withRouter(connect(mapStateToProps, { fetchEvents, getCurrentLocation, updateStateEvents })(Events));
