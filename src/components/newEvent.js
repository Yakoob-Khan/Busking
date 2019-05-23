import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
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
      address: '',
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
      address: this.state.address,
    };
    this.props.createEvent(newEvent, this.props.history);
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

  render() {
    const divStyle = {
      margin: '-18px auto 0 auto',
      position: 'absolute',
      zIndex: '100',
    };
    return (
      <div id="new-event-background">
        <div id="new-event-form">
          <h2 id="new-event-form-header">New Event</h2>
          <form>
            <label className="input-label" htmlFor="new-event-title">Event Title
              <input
                type="text"
                name="title"
                id="new-event-title"
                value={this.state.title}
                placeholder="Tony's Guitar Performance"
                onChange={this.onFieldChange}
              />
            </label>
            <label className="input-label" htmlFor="new-event-description">Event Description
              <input
                type="text"
                name="description"
                id="new-event-description"
                value={this.state.description}
                placeholder="Check out my latest gig."
                onChange={this.onFieldChange}
              />
            </label>
            <label className="input-label" htmlFor="new-event-image">Event Image
              <input
                type="text"
                name="imageURL"
                id="new-event-image"
                value={this.state.imageURL}
                placeholder="image URL"
                onChange={this.onFieldChange}
              />
            </label>
            <p className="input-label" id="new-event-location-label">Event Location</p>
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
            <div id="create-new-event-button-container">
              <button id="create-new-event-button" type="button" onClick={this.submitForm}>Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line new-cap
const WrappedNewEvent = GoogleApiWrapper({
  apiKey: 'AIzaSyAE7HAvGXDK-LG6BfkEM0mgafvwo_Nda1Y',
})(NewEvent);

export default withRouter(connect(null, { createEvent })(WrappedNewEvent));
