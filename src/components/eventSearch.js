import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import axios from 'axios';
import {
  searchEvents,
} from '../actions';


class eventSearch extends Component {
  render() {
    return (
      <div id="search-events-bar">
        <input id="search-events-bar-input" placeholder="Filter by event location or description" ref={(searchbar) => { this.searchbar = searchbar; }} />
        <button id="search-events-bar-button" type="button" onClick={() => this.props.searchEvents(this.searchbar.value)}>Search</button>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.users.user,
    auth: state.auth.isAuthenticated,
    loggedUser: state.auth.user,
  }
);

export default withRouter(connect(mapStateToProps, {
  searchEvents,
})(eventSearch));
