import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
// import { Elements, StripeProvider } from 'react-stripe-elements';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Checkout from './Checkout';
import {
  fetchEvent, updateEvent, deleteEvent, rateEvent, fetchUser,
} from '../actions';
// import PaymentRequestForm from './PaymentRequestForm';
import WrappedEventMap from './eventMap';

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
    this.props.fetchEvent(this.props.match.params.eventId, () => this.props.fetchUser(this.props.event.host));
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

  isObjectEmpty = (object) => {
    // empty object check adapted from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    return Object.entries(object).length === 0 && object.constructor === Object;
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

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
    if ((!this.state.isEditing) && (this.props.user) && (this.props.user.id === this.props.event.host)) {
      return (
        <div id="event-page-background">
          <div id="event-page">
            <div id="event-details-left" style={eventImage} />
            <div id="event-details-right">
              <div id="event-details">
                <div id="event-details-group-1">
                  <p id="event-title">{this.props.event.title}</p>
                  <p id="event-location">{this.props.event.address}</p>
                  {/* <p id="event-time"></p> */}
                </div>
                <div id="event-details-group-2">
                  <Link to={`/users/${this.props.users.user._id}`}>
                    <div id="event-details-group-2-left">
                      <img id="event-creator-photo" src={this.props.users.user.photo} alt="Event Creator" />
                      <p id="event-creator">Event Creator</p>
                      <p id="event-creator-name">{this.props.users.user.name}</p>
                    </div>
                  </Link>
                  <div id="event-details-group-2-right">
                    <p id="event-description">{this.props.event.description}</p>
                    <div id="event-average-rating">
                      <Ratings
                        rating={this.props.event.averageRating}
                        widgetRatedColors="#0099CC"
                        widgetHoverColors="rgb(0,153,204)"
                        widgetEmptyColors="#6B6B6B"
                        widgetSpacings="2px"
                        widgetDimensions="18px"
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
                <div id="event-details-group-3">
                  <button id="update-event-button" className="event-button" type="button" onClick={this.onEdit}>
                    {/* <img src="./../src/assets/pencil.svg" alt="update event" /> */}
                    <p>update event</p>
                  </button>
                  <button id="delete-event-button" className="event-button" type="button" onClick={this.deleteEvent}>
                    {/* <img src="./../src/assets/basket.svg" alt="delete event" /> */}
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
                    name={`Send a tip to ${this.props.users.user.name}!`}
                    description="Your tip goes a long way!"
                    amount={this.state.tip}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.isEditing) {
      return (
        <div id="event-page-background">
          <div id="event-page">
            <div id="event-details-left" style={eventImage} />
            <div id="event-details-right">
              <div id="event-details">
                <div id="event-details-group-1">
                  <p id="event-title">{this.props.event.title}</p>
                  <p id="event-location">{this.props.event.address}</p>
                  {/* <p id="event-time"></p> */}
                </div>
                <div id="event-details-group-2">
                  <Link to={`/users/${this.props.users.user._id}`}>
                    <div id="event-details-group-2-left">
                      <img id="event-creator-photo" src={this.props.users.user.photo} alt="Event Creator" />
                      <p id="event-creator">Event Creator</p>
                      <p id="event-creator-name">{this.props.users.user.name}</p>
                    </div>
                  </Link>
                  <div id="event-details-group-2-right">
                    <p id="event-description">{this.props.event.description}</p>
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
                <div id="event-details-group-3">
                  <Checkout
                  // `#demo${this.state.id}`
                    name={`Send a tip to ${this.props.users.user.name}!`}
                    description="Your tip goes a long way!"
                    amount={this.state.tip}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const divStyle = {
        margin: '-18px auto 0 auto',
        position: 'absolute',
        zIndex: '100',
      };
      return (
        <div id="update-event-background">
          <div id="update-event-form">
            <h2 id="update-event-form-header">Update Event</h2>
            <form>
              <label className="input-label" htmlFor="update-event-title">Event Title
                <input
                  type="text"
                  name="title"
                  id="update-event-title"
                  value={this.state.title}
                  // defaultValue={this.state.title}
                  placeholder="Event Title"
                  onChange={this.onFieldChange}
                />
              </label>
              <label className="input-label" htmlFor="update-event-description">Description
                <textarea
                  type="text"
                  name="description"
                  id="update-event-description"
                  value={this.state.description}
                  // defaultValue={this.state.description}
                  placeholder="Event Description"
                  onChange={this.onFieldChange}
                  maxLength="250"
                  rows="2"
                />
              </label>
              <label className="input-label" htmlFor="update-event-image">Event Image
                <input
                  type="text"
                  name="imageURL"
                  id="update-event-image"
                  value={this.state.imageURL}
                  // defaultValue={this.state.imageURL}
                  placeholder="Image url"
                  onChange={this.onFieldChange}
                />
              </label>
              <p className="input-label" id="update-event-location-label">Event Location</p>
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
                        placeholder: 'Enter a location',
                        className: 'location-search-input',
                      })}
                    />
                    <div className="autocomplete-dropdown-container" style={divStyle}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        const style = suggestion.active
                          ? {
                            backgroundColor: 'rgba(158, 163, 190, 1)',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            color: 'white',
                            marginBottom: '2px',
                            padding: '10px 20px',
                            width: '45.5vw',
                          }
                          : {
                            backgroundColor: 'rgba(158, 163, 190, 0.6)',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            color: 'white',
                            marginBottom: '2px',
                            padding: '10px 20px',
                            width: '45.5vw',
                          };
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
              <div id="make-changes-button-container">
                <button id="make-changes-button" type="button" onClick={this.onEdit}>make changes</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }

  render() {
    if (!this.isObjectEmpty(this.props.users.user) && !this.isObjectEmpty(this.props.event)) {
      return (
        <div>
          {this.renderEvent()}
          <div id="map-wrapper">
            <WrappedEventMap />
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => (
  {
    event: state.events.event,
    user: state.auth.user,
    users: state.users,
  }
);

export default withRouter(connect(mapStateToProps, {
  fetchEvent, updateEvent, deleteEvent, rateEvent, fetchUser,
})(Event));
