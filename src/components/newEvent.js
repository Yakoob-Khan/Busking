import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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
        // console.log('Success', latlng);
        this.setState({
          longitude: latlng.lng,
          latitude: latlng.lat,
        });
      })
      .catch(error => console.error('Error', error));
  };

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
