import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
// import { Elements, StripeProvider } from 'react-stripe-elements';
import Checkout from './Checkout';
import {
  fetchEvent, updateEvent, deleteEvent, rateEvent,
} from '../actions';
// import PaymentRequestForm from './PaymentRequestForm';


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
      rating: 0,
      tip: '',
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
      longitude: this.props.eavent.longitude,
      latitude: this.props.event.latitude,
      eventCreator: this.props.event.eventCreator,
    });
  }

  deleteEvent = () => {
    this.props.deleteEvent(this.props.event._id, this.props.history);
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

  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
    this.props.rateEvent(this.props.event._id, this.state.rating);
  }


  renderEvent = () => {
    const eventImage = {
      backgroundImage: `url(${this.props.event.imageURL})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
    if (!this.state.isEditing) {
      return (
        <div className="event-page">
          <div className="event-image-container" style={eventImage} />
          <div id="event-location">
            <p>Longitude: {this.props.event.longitude}</p>
            <p>Latitude: {this.props.event.latitude}</p>
          </div>
          <div id="event-details">
            <div id="event-details-left">
              <p id="event-title">{this.props.event.title}</p>
              <p id="event-description">{this.props.event.description}</p>
              <p id="event-creator">Event Creator: {this.props.event.eventCreator}</p>
              <button id="update-event-button"
                className="event-button"
                type="button"
                onClick={this.startEdit}
              >
                <img src="./../src/assets/pencil.svg" alt="update event" />
                update event
              </button>
              <button id="delete-event-button" className="event-button" type="button" onClick={this.deleteEvent}>Delete Event</button>
              {/* <input
                type="text"
                name="tip"
                value={this.state.tip}
                placeholder="Tip Amount"
                onChange={this.onFieldChange}
              />
              <button type="button" onClick={this.payment}> Tip </button> */}
              <Checkout
                // `#demo${this.state.id}`
                name={`Send a tip to ${this.props.event.eventCreator}!`}
                description="You're tip goes a long way!"
                amount={this.state.tip}
              />
            </div>
            <div id="event-details-right">
              <div id="event-average-rating">
                <Ratings
                  rating={this.props.event.averageRating}
                  widgetRatedColors="#0099CC"
                  widgetHoverColors="rgb(0,153,204)"
                  widgetEmptyColors="#6B6B6B"
                  widgetSpacings="3px"
                  widgetDimensions="32px"
                  changeRating={this.changeRating}
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
                <p id="event-average-rating-label">
                  Average Rating: {this.props.event.averageRating ? this.props.event.averageRating.toFixed(2) : ''}
                </p>
              </div>
            </div>
          </div>
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
            <div>
              <Ratings
                rating={this.props.event.averageRating}
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
      <div>
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
