import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEvent } from '../actions';

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imageURL: '',
      longitude: '',
      latitude: '',
      eventCreator: '',
      description: '',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = () => {
    const newEvent = {
      title: this.state.title,
      imageURL: this.state.imageURL,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      eventCreator: this.state.eventCreator,
      description: this.state.description,
    };
    this.props.createEvent(newEvent, this.props.history);
  }

  render() {
    return (
      <div>
        <h2>New Event</h2>
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
          Event Description:<br />
          <input
            type="text"
            name="description"
            value={this.state.description}
            placeholder="Event Description"
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

export default withRouter(connect(null, { createEvent })(NewEvent));
