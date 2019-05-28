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
      <div>
          hello
        <textarea ref={(searchbar) => { this.searchbar = searchbar; }} />
        <button type="button" onClick={() => this.props.searchEvents(this.searchbar.value)}>search!</button>
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
