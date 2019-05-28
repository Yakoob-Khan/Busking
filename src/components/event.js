import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
// import { Elements, StripeProvider } from 'react-stripe-elements';
import Checkout from './Checkout';
import {
  fetchEvent, updateEvent, deleteEvent, rateEvent, fetchUser, attendEvent, leaveEvent, writeComment,
} from '../actions';
// import PaymentRequestForm from './PaymentRequestForm';
import WrappedEventMap from './eventMap';
import '../style.scss';


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
      tip: '',
      startTime: new Date(),
      endTime: new Date(),
    };

    this.onEdit = this.onEdit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    // this.submitForm = this.submitForm.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId, () => this.props.fetchUser(this.props.event.host));
    window.scrollTo(0, 0);
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
        // startTime: this.props.event.startTime,
        // endTime: this.props.event.endTime,
      });
    }
  }

  isObjectEmpty = (object) => {
    // empty object check adapted from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    return Object.entries(object).length === 0 && object.constructor === Object;
  }

  deleteEvent = () => {
    this.props.deleteEvent(this.props.event._id, this.props.history);
  }

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onStartTimeChange = startTime => this.setState({ startTime });

  onEndTimeChange = endTime => this.setState({ endTime });

  startEdit = () => {
    if (this.state.imageURL.length === 0) {
      const defaultImages = [
        'https://www.jetsetter.com/uploads/sites/7/2018/05/L-ddNDL7-1380x690.jpeg',
        'https://purewows3.imgix.net/images/articles/2017_03/beautiful_city_paris.png?auto=format,compress&cs=strip',
        'https://besthqwallpapers.com/img/original/48870/spanish-steps-fontana-della-barcaccia-piazza-di-spagna-rome-italy.jpg',
        'https://handluggageonly.co.uk/wp-content/uploads/2017/03/Hong-Kong-At-Night.jpg',
        'https://learnallnow.com/wp-content/uploads/2018/06/los-angeles-dest1215.jpg',
      ];
      const listLength = defaultImages.length;
      const randomIndex = Math.floor(Math.random() * listLength);
      const randomlySelectedDefaultImage = defaultImages[randomIndex];
      this.state.imageURL = randomlySelectedDefaultImage;
    }
    const update = {
      id: this.props.event._id,
      title: this.state.title,
      description: this.state.description,
      imageURL: this.state.imageURL,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      address: this.state.address,
      eventCreator: this.state.eventCreator,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
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
      startTime: new Date(),
      endTime: new Date(),
    });
    this.props.updateEvent(update);
  }

  deleteEvent = () => {
    this.props.deleteEvent(this.props.event._id, this.props.history);
  }

  attendEvent = () => {
    this.props.attendEvent(this.props.event.id);
  }

  leaveEvent = () => {
    this.props.leaveEvent(this.props.event.id);
  }

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeRating = (newRating) => {
    this.props.rateEvent(this.props.event._id, newRating, this.props.history);
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

  renderAttendButton = () => {
    if (this.props.event && this.props.user) {
      if (this.props.event.attendees.filter(attendee => (attendee.id === this.props.user.id)).length > 0) {
        return (
          <button id="leave-event-button" className="event-button" type="button" onClick={this.leaveEvent}>
            <p>leave event</p>
          </button>
        );
      } else if (this.props.event.attendees.filter(attendee => (attendee.id === this.props.user.id)).length === 0) {
        return (
          <button id="attend-event-button" className="event-button" type="button" onClick={this.attendEvent}>
            <p>attend event</p>
          </button>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderEvent = () => {
    moment.locale('en');
    const eventImage = {
      backgroundImage: `url(${this.props.event.imageURL})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
    const numOfComments = this.props.event.comments.length;
    if ((!this.state.isEditing) && (this.props.user) && (this.props.user.id === this.props.event.host)) {
      return (
        <div id="event-page-background">
          <div id="event-page">
            <div id="event-details-container">
              <div id="event-details-left" style={eventImage} />
              <div id="event-details-right">
                <div id="event-details">
                  <div id="event-details-group-1">
                    <p id="event-title">{this.props.event.title}</p>
                    <p id="event-location">{this.props.event.address}</p>
                    <p id="event-time">
                      <span>{moment(this.props.event.startTime).format('MMM DD LT')}</span>
                      <span> &#45; </span>
                      <span>{moment(this.props.event.endTime).format('MMM DD LT')}</span>
                    </p>
                  </div>
                  <div id="event-details-group-2">
                    <Link id="event-creator-link" to={`/users/${this.props.users.user._id}`}>
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
                          // rating={this.props.event.sumOfRating / this.props.event.numberOfRatings}
                          rating={this.props.event.averageRating}
                          widgetRatedColors="#0099CC"
                          widgetHoverColors="rgb(0,153,204)"
                          widgetEmptyColors="#6B6B6B"
                          widgetSpacings="2px"
                          widgetDimensions="18px"
                          // changeRating={this.changeRating}
                        >
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                        </Ratings>
                        <p id="event-average-rating-label">
                          Average Rating: {this.props.event.averageRating ? this.props.event.averageRating.toFixed(2) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="event-details-group-3">
                    <button id="update-event-button" className="event-button" type="button" onClick={this.onEdit}>
                      <p>update event</p>
                    </button>
                    <button id="delete-event-button" className="event-button" type="button" onClick={this.deleteEvent}>
                      <p>delete event</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div id="map-wrapper">
              <WrappedEventMap />
            </div>
            <div id="comments-section">
              <h3 id="comments-section-header">{numOfComments} {numOfComments === 1 ? 'Comment' : 'Comments'}</h3>
              <div id="new-comment">
                <img id="new-comment-current-user" src={this.props.user.photo} alt={this.props.user.name} />
                <textarea id="new-comment-input" placeholder="Write a comment" ref={(commentInput) => { this.commentInput = commentInput; }} />
                <button id="new-comment-button" type="button" onClick={() => this.props.writeComment(this.props.event.id, this.commentInput.value, this.props.history)}>Comment</button>
              </div>
              <div id="all-previous-comments">
                {this.props.event.comments.map((comment) => {
                  return (
                    <div id="comment">
                      <div id="comment-author">
                        <img id="comment-author-image" src={comment.author.photo} alt={comment.author.name} />
                        <div id="comment-author-name-and-text">
                          <span id="comment-author-name">{comment.author.name}</span>
                          <span id="comment-text">{comment.text}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.isEditing) {
      return (
        <div id="event-page-background">
          <div id="event-page">
            <div id="event-details-container">
              <div id="event-details-left" style={eventImage} />
              <div id="event-details-right">
                <div id="event-details">
                  <div id="event-details-group-1">
                    <p id="event-title">{this.props.event.title}</p>
                    <p id="event-location">{this.props.event.address}</p>
                    <p id="event-time">
                      <span>{moment(this.props.event.startTime).format('MMM DD LT')}</span>
                      <span> &#45; </span>
                      <span>{moment(this.props.event.endTime).format('MMM DD LT')}</span>
                    </p>
                  </div>
                  <div id="event-details-group-2">
                    <Link id="event-creator-link" to={`/users/${this.props.users.user._id}`}>
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
                          Average Rating: {this.props.event.averageRating ? this.props.event.averageRating.toFixed(2) : 'N/A'}
                          {/* example of comment usage */}
                          {/* to get text do comment.text */}
                          {/* {this.props.event.comments.map(comment => console.log(comment.author.name))}
                          {console.log(this.props.event.latitude)} */}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="event-details-group-3">
                    <div id="tip-input-group">
                      <p id="tip-input-label" htmlFor="tip-input">Tip Amount</p>
                      <span id="tip-input">$
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          name="tip"
                          value={this.state.tip}
                          onChange={this.onFieldChange}
                        />
                      </span>
                      <Checkout
                        // `#demo${this.state.id}`
                        name={`Send a tip to ${this.props.users.user.name}`}
                        description="Your tip goes a long way!"
                        amount={this.state.tip}
                        stripeId={this.props.event.stripeId}
                        eventCreatorImage={this.props.users.user.photo}
                      />
                    </div>
                    {this.renderAttendButton()}
                  </div>
                </div>
              </div>
            </div>
            <div id="map-wrapper">
              <WrappedEventMap />
            </div>
            <div id="comments-section">
              <h3 id="comments-section-header">{numOfComments} {numOfComments === 1 ? 'Comment' : 'Comments'}</h3>
              <div id="new-comment">
                <img id="new-comment-current-user" src={this.props.user.photo} alt={this.props.user.name} />
                <textarea id="new-comment-input" placeholder="Write a comment" ref={(commentInput) => { this.commentInput = commentInput; }} />
                <button id="new-comment-button" type="button" onClick={() => this.props.writeComment(this.props.event.id, this.commentInput.value, this.props.history)}>Comment</button>
              </div>
              <div id="all-previous-comments">
                {this.props.event.comments.map((comment) => {
                  return (
                    <div id="comment">
                      <div id="comment-author">
                        <img id="comment-author-image" src={comment.author.photo} alt={comment.author.name} />
                        <div id="comment-author-name-and-text">
                          <span id="comment-author-name">{comment.author.name}</span>
                          <span id="comment-text">{comment.text}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const today = new Date();
      const oneweek = new Date();
      oneweek.setDate(oneweek.getDate() + 7);
      const divStyle = {
        margin: '-18px auto 0 auto',
        position: 'absolute',
        zIndex: '100',
      };
      return (
        <div id="update-event-background">
          <div id="update-event-form">
            <h2 id="update-event-form-header">Update Event</h2>
            <form id="event-form">
              <label className="input-label" htmlFor="update-event-title">Event Title
                <input
                  type="text"
                  name="title"
                  id="update-event-title"
                  className="update-event-input"
                  value={this.state.title}
                  placeholder="Event Title"
                  onChange={this.onFieldChange}
                />
              </label>
              <label className="input-label" htmlFor="update-event-description">Description
                <textarea
                  type="text"
                  name="description"
                  id="update-event-description"
                  className="update-event-input"
                  value={this.state.description}
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
                  className="update-event-input"
                  value={this.state.imageURL}
                  placeholder="Image url"
                  onChange={this.onFieldChange}
                />
              </label>
              <div id="update-event-start-time">
                <p className="input-label input-label-p" htmlFor="update-event-start-time">Event Start Time</p>
                <DateTimePicker
                  onChange={this.onStartTimeChange}
                  required
                  disableClock
                  clearIcon={null}
                  value={this.state.startTime}
                  minDate={today}
                  maxDate={oneweek}
                />
              </div>
              <div id="update-event-end-time">
                <p className="input-label input-label-p" htmlFor="update-event-end-time">Event End Time</p>
                <DateTimePicker
                  onChange={this.onEndTimeChange}
                  required
                  disableClock
                  clearIcon={null}
                  value={this.state.endTime}
                  minDate={today}
                  maxDate={oneweek}
                />
              </div>
              <p className="input-label input-label-p" id="update-event-location-label">Event Location</p>
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
                        className: 'new-event-input',
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
                            borderRadius: '3px',
                            cursor: 'pointer',
                            color: 'white',
                            marginBottom: '2px',
                            padding: '10px',
                            width: '47vw',
                          }
                          : {
                            backgroundColor: 'rgba(158, 163, 190, 0.6)',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            color: 'white',
                            marginBottom: '2px',
                            padding: '10px',
                            width: '47vw',
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
          {/* HI MAX HERE IS A COMMENT EXAMPLE BELOW
          IT IS VERY UGLY AND RUINS THE DISPLAY
          BUT CAN BE REMOVED WITH A comment
          I DONT KNOW HOW TO STYLE THIS STUFF SO I ASSUME
          YOU WANT TO MAKE IT PRETTY
           */}
          {/* <textarea ref={(commentInput) => { this.commentInput = commentInput; }} />
          <button type="button" onClick={() => this.props.writeComment(this.props.event.id, this.commentInput.value, this.props.history)} /> */}
          {/* <div id="map-wrapper">
            <WrappedEventMap />
          </div> */}
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
  fetchEvent, updateEvent, deleteEvent, rateEvent, fetchUser, attendEvent, leaveEvent, writeComment,
})(Event));
