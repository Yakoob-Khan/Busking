/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import Modal from 'simple-react-modal';
import DateTimePicker from 'react-datetime-picker';
import { createEvent, updateCurrentUser } from '../actions';

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imageURL: '',
      longitude: '',
      latitude: '',
      description: '',
      address: '',
      startTime: new Date(),
      endTime: new Date(),
      show: false,
      error: '',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.close = this.close.bind(this);
  }

  onStartTimeChange = (startTime) => {
    this.setState({ startTime });
    if (startTime.getTime() < this.state.endTime.getTime()) {
      if (this.state.error === 'Please provide valid start and end times for your event!') {
        this.setState({
          show: false,
          error: '',
        });
      }
    } else {
      this.setState({
        show: true,
        error: 'Please provide valid start and end times for your event!',
      });
    }
  };

  onEndTimeChange = (endTime) => {
    this.setState({ endTime });
    if (this.state.startTime.getTime() < endTime.getTime()) {
      if (this.state.error === 'Please provide valid start and end times for your event!') {
        this.setState({
          show: false,
          error: '',
        });
      }
    } else {
      this.setState({
        show: true,
        error: 'Please provide valid start and end times for your event!',
      });
    }
  };

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = () => {
    if (this.state.latitude === '' || this.state.longitude === '') {
      this.setState({
        show: true,
        error: 'Please select a valid address from the drop-down menu!',
      });
    } else if (this.state.startTime.getTime() >= this.state.endTime.getTime()) {
      this.setState({
        show: true,
        error: 'Please provide valid start and end times for your event!',
      });
    } else if (!this.state.show) {
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
      const newEvent = {
        title: this.state.title,
        imageURL: this.state.imageURL,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        description: this.state.description,
        address: this.state.address,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        stripeId: this.props.user.stripeId,
      };
      this.props.createEvent(newEvent, this.props.history);
    }
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => {
        if (results[0].address_components.length < 6) {
          this.setState({
            show: true,
            error: 'Please provide a more specific location!',
          });
        } else {
          this.setState({
            show: false,
            error: '',
          });
        }
        getLatLng(results[0]).then((latlng) => {
          this.setState({
            longitude: latlng.lng,
            latitude: latlng.lat,
          });
        });
      })
      .catch(error => console.error('Error', error));
  };

  close = () => {
    this.setState({ show: false });
  }

  render() {
    const today = new Date();
    const oneweek = new Date();
    oneweek.setDate(oneweek.getDate() + 7);
    const divStyle = {
      margin: '-14px auto 0 auto',
      position: 'absolute',
      width: '100%',
      zIndex: '100',
    };
    return (
      <div id="new-event-background">
        <div id="new-event-form">
          <h2 id="new-event-form-header">New Event</h2>
          <Modal
            className="error-modal"
            containerClassName="test"
            closeOnOuterClick
            show={this.state.show}
            onClose={() => this.close()}
          >
            <div className="error-prompt">
              &#x26A0; {this.state.error}
              <button className="error-close"
                onClick={this.close.bind(this)}
                type="submit"
              >X
              </button>
            </div>
          </Modal>
          <form>
            <label className="input-label" htmlFor="new-event-title">Event Title
              <input
                type="text"
                name="title"
                id="new-event-title"
                className="new-event-input"
                value={this.state.title}
                placeholder="Tony's Guitar Performance"
                onChange={this.onFieldChange}
              />
            </label>
            <label className="input-label" htmlFor="new-event-description">Event Description
              <textarea
                type="text"
                name="description"
                id="new-event-description"
                className="new-event-input"
                value={this.state.description}
                placeholder="Check out my latest gig."
                onChange={this.onFieldChange}
                maxLength="250"
              />
            </label>
            <label className="input-label" htmlFor="new-event-image">Event Image
              <input
                type="text"
                name="imageURL"
                id="new-event-image"
                className="new-event-input"
                value={this.state.imageURL}
                placeholder="image URL"
                onChange={this.onFieldChange}
              />
            </label>
            <div id="create-event-start-time">
              <p className="input-label input-label-p" htmlFor="create-event-start-time">Event Start Time</p>
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
            <div id="create-event-end-time">
              <p className="input-label input-label-p" htmlFor="create-event-end-time">Event End Time</p>
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
            <p className="input-label input-label-p" id="new-event-location-label">Event Location</p>
            <PlacesAutocomplete
              id="new-event-location"
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
            <div id="create-new-event-button-container">
              <button id="create-new-event-button" type="button" onClick={this.submitForm}>Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    event: state.events.event,
    user: state.users.user,
    auth: state.auth.isAuthenticated,
    loggedUser: state.auth.user,
  }
);
// eslint-disable-next-line new-cap
const WrappedNewEvent = GoogleApiWrapper({
  apiKey: 'AIzaSyAE7HAvGXDK-LG6BfkEM0mgafvwo_Nda1Y',
})(NewEvent);

export default withRouter(connect(mapStateToProps, { createEvent, updateCurrentUser })(WrappedNewEvent));
