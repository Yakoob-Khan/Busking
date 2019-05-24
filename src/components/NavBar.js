/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Modal from 'simple-react-modal';
import config from '../config.json';
import { facebookResponse } from '../actions';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
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

  show = () => {
    this.setState({ show: true });
  }

  close= () => {
    this.setState({ show: false });
  }

  render() {
    console.log(this.props.auth);
    if (this.props.auth.isAuthenticated) {
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
    } else {
      return (
        <nav>
          <ul className="navbar">
            <NavLink to="/" exact className="nav-link">
              <li className="nav-item">
                <span role="img" aria-label="home" className="emoji">&#11088;</span>
                Home
              </li>
            </NavLink>

            <li className="nav-item" onClick={this.show.bind(this)}>
              <span role="img" aria-label="see events" className="emoji">&#127927;</span>

              <p className="nav-link">Create Event</p>
            </li>

            {this.renderLogIn()}

          </ul>
          <Modal
            className="login-modal" // this will completely overwrite the default css completely
            // containerStyle={{ background: 'white' }} // changes styling on the inner content area
            containerClassName="test"
            closeOnOuterClick
            show={this.state.show}
            onClose={() => this.close()}
          >
            <div className="login-prompt">
              You must be logged in to create a new event!
              <button id="login-close"
                onClick={this.close.bind(this)}
                type="submit"
              >X
              </button>
            </div>


          </Modal>
        </nav>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, { facebookResponse })(NavBar));
