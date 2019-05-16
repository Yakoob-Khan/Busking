import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchEvent, updateEvent, deleteEvent, rateEvent,
} from '../actions';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: '',
      imageURL: '',
      longitude: '',
      latitude: '',
      eventCreator: '',
      rating: '',
    };
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }

  startEdit = () => {
    this.setState({
      isEditing: true,
      title: this.props.event.title,
      imageURL: this.props.event.imageURL,
      longitude: this.props.event.longitude,
      latitude: this.props.event.latitude,
      eventCreator: this.props.event.eventCreator,
    });
  }

  deleteEvent = () => {
    this.props.deleteEvent(this.props.event._id, this.props.history);
  }

  rateEvent = () => {
    this.props.rateEvent(this.props.event._id, this.state.rating);
  }

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = () => {
    const update = {
      id: this.props.event._id,
      title: this.state.title,
      imageURL: this.state.imageURL,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      eventCreator: this.state.eventCreator,
    };
    this.props.updateEvent(update);
    this.setState({
      isEditing: false,
    });
  }

  renderEvent = () => {
    if (!this.state.isEditing) {
      return (
        <div className="event">
          <p>Title: {this.props.event.title}</p>
          <p>Image URL: {this.props.event.imageURL}</p>
          <p>Longitude: {this.props.event.longitude}</p>
          <p>Latitude: {this.props.event.latitude}</p>
          <p>Event Creator: {this.props.event.eventCreator}</p>
          <p>Average Rating: {this.props.event.averageRating}</p>
          <button type="button" onClick={this.startEdit}> Update </button>
          <button type="button" onClick={this.deleteEvent}> Delete </button>
          <input
            type="text"
            name="rating"
            value={this.state.rating}
            placeholder="rating"
            onChange={this.onFieldChange}
          />
          <button type="button" onClick={this.rateEvent}> Rate </button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Update Event</h2>
          <form>
            Event Title:<br />
            <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Event Title"
              onChange={this.onFieldChange}
            />
            <br />

            ImageUrl:<br />
            <input
              type="text"
              name="imageURL"
              value={this.state.imageURL}
              placeholder="Image url"
              onChange={this.onFieldChange}
            />
            <br />

            Longitude:<br />
            <input
              type="text"
              name="longitude"
              value={this.state.longitude}
              placeholder="Longitude"
              onChange={this.onFieldChange}
            />
            <br />

            Latitude:<br />
            <input
              type="text"
              name="latitude"
              value={this.state.latitude}
              placeholder="Latitude"
              onChange={this.onFieldChange}
            />
            <br />

            Event Creator:<br />
            <input
              type="text"
              name="eventCreator"
              value={this.state.eventCreator}
              placeholder="Event Creator"
              onChange={this.onFieldChange}
            />
            <br />

            <br /><br />
            <button type="button" onClick={this.submitForm}> Submit </button>
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="allEvents">
        {this.renderEvent()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    event: state.events.event,
  }
);

export default withRouter(connect(mapStateToProps, {
  fetchEvent, updateEvent, deleteEvent, rateEvent,
})(Event));
