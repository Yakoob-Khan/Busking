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
            <p className="event-title">
              {event.title}
            </p>
            <Ratings
              rating={Math.round(event.averageRating)}
              widgetRatedColors="rgb(255, 250, 0)"
              changeRating={this.changeRating}
              widgetDimensions="35px"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
            <Link to={`events/${event.id}`} key={event.id} className="event-container">
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
