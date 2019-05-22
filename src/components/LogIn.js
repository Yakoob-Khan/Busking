/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-restricted-globals */
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../config.json';
import { facebookResponse, logoutUser, testAPI } from '../actions';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const content = this.props.auth.isAuthenticated
      ? (
        <div>
          <p>Authenticated</p>
          <div>
            {this.props.auth.user.email}
            {this.props.auth.user.name}
            <img alt="profile" src={this.props.auth.user.photo} />
            {console.log(this.props.auth.user)}
          </div>
          <div>
            <button onClick={this.props.logoutUser} className="button" type="submit">
                    Log out
            </button>
            <button onClick={this.props.testAPI} className="button" type="submit">TEST API</button>
          </div>
        </div>
      )
      : (
        <div>
          <FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.props.facebookResponse}
          />
        </div>
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

const mapStateToProps = reduxState => (
  {
    auth: reduxState.auth,
  }
);

export default withRouter(connect(mapStateToProps, { facebookResponse, logoutUser, testAPI })(LogIn));
