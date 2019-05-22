import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
// import { Elements, StripeProvider } from 'react-stripe-elements';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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
      description: '',
      imageURL: '',
      longitude: '',
      latitude: '',
      address: '',
      eventCreator: '',
      rating: 0,
      tip: '',
    };

    this.onEdit = this.onEdit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    // this.submitForm = this.submitForm.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }


  onEdit(event) {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
    if (this.state.isEditing) {
      this.startEdit();
    } else {
      this.setState({
        title: this.props.event.title,
        description: this.props.event.description,
        imageURL: this.props.event.imageURL,
        longitude: this.props.event.longitude,
        latitude: this.props.event.latitude,
        address: this.props.event.address,
        eventCreator: this.props.event.eventCreator,
      });
    }
  }

  startEdit = () => {
    const update = {
      id: this.props.event._id,
      title: this.state.title,
      description: this.state.description,
      imageURL: this.state.imageURL,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      address: this.state.address,
      eventCreator: this.state.eventCreator,
    };
    this.setState({
      isEditing: false,
      title: '',
      description: '',
      imageURL: '',
      longitude: '',
      latitude: '',
      eventCreator: '',
      address: '',
    });
    this.props.updateEvent(update);
  }

  deleteEvent = () => {
    this.props.deleteEvent(this.props.event._id, this.props.history);
  }

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  // submitForm = () => {
  //   const update = {
  //     id: this.props.event._id,
  //     title: this.state.title,
  //     imageURL: this.state.imageURL,
  //     longitude: this.state.longitude,
  //     latitude: this.state.latitude,
  //     eventCreator: this.state.eventCreator,
  //   };
  //   this.props.updateEvent(update);
  //   this.setState({
  //     isEditing: false,
  //   });
  // }

  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
    this.props.rateEvent(this.props.event._id, this.state.rating);
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((latlng) => {
        this.setState({
          longitude: latlng.lng,
          latitude: latlng.lat,
        });
      })
      .catch(error => console.error('Error', error));
  };

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
            {/* <p>Longitude: {this.props.event.longitude}</p>
            <p>Latitude: {this.props.event.latitude}</p> */}
            <p>{this.props.event.address}</p>
          </div>
          <div id="event-details">
            <div id="event-details-left">
              <p id="event-title">{this.props.event.title}</p>
              <p id="event-description">{this.props.event.description}</p>
              <p id="event-creator">Event Creator: {this.props.event.eventCreator}</p>
              <button id="update-event-button" className="event-button" type="button" onClick={this.onEdit}>
                <img src="./../src/assets/pencil.svg" alt="update event" />
                <p>update event</p>
              </button>
              <button id="delete-event-button" className="event-button" type="button" onClick={this.deleteEvent}>
                <img src="./../src/assets/basket.svg" alt="delete event" />
                <p>delete event</p>
              </button>
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
                description="Your tip goes a long way!"
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
              // defaultValue={this.state.title}
              placeholder="Event Title"
              onChange={this.onFieldChange}
            />
            <br />

            Description:<br />
            <input
              type="text"
              name="description"
              value={this.state.description}
              // defaultValue={this.state.description}
              placeholder="Event Description"
              onChange={this.onFieldChange}
            />
            <br />

            ImageUrl:<br />
            <input
              type="text"
              name="imageURL"
              value={this.state.imageURL}
              // defaultValue={this.state.imageURL}
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


            {/* Longitude:<br />
            <input
              type="text"
              name="longitude"
              value={this.state.longitude}
              // defaultValue={this.state.longitude}
              placeholder="Longitude"
              onChange={this.onFieldChange}
            />
            <br />

            Latitude:<br />
            <input
              type="text"
              name="latitude"
              value={this.state.latitude}
              // defaultValue={this.state.latitude}
              placeholder="Latitude"
              onChange={this.onFieldChange}
            />
            <br /> */}

            Location:<br />
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps, suggestions, getSuggestionItemProps, loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            {/* Event Creator:<br />
            <input
              type="text"
              name="eventCreator"
              value={this.state.eventCreator}
              // defaultValue={this.state.eventCreator}
              placeholder="Event Creator"
              onChange={this.onFieldChange}
            />
            <br /> */}

            <br /><br />
            <button type="button" onClick={this.onEdit}> Submit </button>
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
