import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import { fetchEvents } from '../actions';

class Events extends Component {
  componentDidMount() {
    this.props.fetchEvents();
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
        return (

          <div className="event" key={event.id}>
            {/* <img
              alt="event-banner"
              src="https://upload.wikimedia.org/wikipedia/commons/9/97/Peoria_skyline_banner.jpg"
              id="event-banner"
            /> */}
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
            <Link to={`events/${event.id}`} key={event.id} className="more-info">
              More
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
      <div className="allEvents">
        <p className="events-header">See what&apos;s happening now!</p>
        {this.renderEvents()}
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
