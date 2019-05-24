/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import config from '../config.json';
import { facebookResponse } from '../actions';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLogIn = () => {
    if (this.props.auth.isAuthenticated) {
      return (
        <NavLink to={`/users/${this.props.auth.user._id}`} className="nav-link">
          <li className="nav-item">
            <span role="img" aria-label="see events" className="emoji">&#128075;</span>
            My Profile
          </li>
        </NavLink>
      );
    } else {
      return (
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <span role="img" aria-label="see events" className="emoji">&#128075;</span>
            {/* Login with Facebook
           */}
            <FacebookLogin
              appId={config.FACEBOOK_APP_ID}
              callback={this.props.facebookResponse}
              // onClick={this.props.facebookResponse}
              render={renderProps => (
                <span onClick={renderProps.onClick}>Login with Facebook</span>
              // <button type="button" id="facebooksignin" onClick={renderProps.onClick}>This is my custom FB button</button>
              )}
            />
          </NavLink>
        </li>
      );
    }
  }

  render() {
    return (
      <nav>
        <ul className="navbar">
          <NavLink to="/" exact className="nav-link">
            <li className="nav-item">
              <span role="img" aria-label="home" className="emoji">&#11088;</span>
              Home
            </li>
          </NavLink>
          <NavLink to="/createEvent" exact className="nav-link">
            <li className="nav-item">
              <span role="img" aria-label="see events" className="emoji">&#127927;</span>
              Create Event
            </li>
          </NavLink>
          {this.renderLogIn()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, { facebookResponse })(NavBar));
