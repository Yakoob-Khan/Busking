/* eslint-disable no-restricted-globals */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = () => {
    // Credit to stop form post submission: https://api.jquery.com/event.preventdefault/
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.signinUser(user, this.props.history);
    // Remove account info from local state for security!
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div>
        <p>Let&apos;s sign you in!</p>
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
        LogIn!
        </button>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(LogIn));
