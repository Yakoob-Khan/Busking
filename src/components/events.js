import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import { fetchEvents } from '../actions';
import WrappedMapView from './wrappedMapView';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapBool: false,
    };

    this.onToggleMap = this.onToggleMap.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
  }


  componentDidMount() {
    this.props.fetchEvents();
  }

  onToggleMap(event) {
    this.setState(prevState => ({
      mapBool: !prevState.mapBool,
    }));
  }

  // stars = (rating) => {
  //   return (
  //     <Ratings
  //       rating={this.state.rating}
  //       widgetRatedColors="blue"
  //       changeRating={this.changeRating}
  //     />
  //   );
  // }

  renderEvents = () => {
    if (this.props.events.length !== 0) {
      return this.props.events.map((event) => {
        const eventStyle = {
          backgroundImage: `url(${event.imageURL})`,
        };
        return (
          <div className="event" key={event.id} style={eventStyle}>
            <p className="event-title">
              {event.title}
            </p>
            {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
            <Ratings
              rating={event.averageRating}
              widgetRatedColors="rgb(255, 250, 0)"
              widgetDimensions="35px"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
            <Link to={`events/${event.id}`} key={event.id} className="view-details">
              view details
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
        <p className="events-header">Events nearby</p>
        <p className="events-subheader">See what&apos;s happening now</p>
        <div className="events-button-container">
          {/* <NavLink to="/" onClick={this.onToggleMap} className="events-toggle">Map View</NavLink> */}
          {/* <NavLink to="/" onClick={this.onToggleMap} className="events-toggle">List View</NavLink> */}
          <button onClick={this.onToggleMap} className="events-toggle" type="button">Toggle View</button>
        </div>
        <div className="allEvents">
          {this.state.mapBool ? <WrappedMapView /> : this.renderEvents()}
          {/* {this.renderEvents()} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.allEvents,
  }
);

export default withRouter(connect(mapStateToProps, { fetchEvents })(Events));
