/* eslint-disable no-restricted-globals */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  onSubmit = () => {
    // Credit to stop form post submission: https://api.jquery.com/event.preventdefault/
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    };
    this.props.signupUser(user, this.props.history);
  }

  render() {
    return (
      <div>
        <p>Let&apos;s sign you up!</p>
        <input
          onChange={() => { this.setState({ username: event.target.value }); }}
          value={this.state.username}
          placeholder="username"
        />
        <input
          onChange={() => { this.setState({ email: event.target.value }); }}
          value={this.state.email}
          placeholder="email"
        />
        <input
          onChange={() => { this.setState({ password: event.target.value }); }}
          value={this.state.password}
          placeholder="password"
        />
        <button
          type="submit"
          onClick={this.onSubmit}
        >
        Sign up!
        </button>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(SignUp));
