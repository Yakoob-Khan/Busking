import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchEvents } from '../actions';

class Events extends Component {
  componentDidMount(props) {
    this.props.fetchEvents();
  }

  renderEvents = () => {
    if (this.props.events.length !== 0) {
      return this.props.events.map((event) => {
        return (
          <Link to={`events/${event.id}`} key={event.id}>
            <div className="event">
              <p>Title: {event.title}</p>
              <p>Average Rating: {event.averageRating}</p>
              <p>Image URL: {event.imageURL}</p>
            </div>
          </Link>
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
