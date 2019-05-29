/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Modal from 'simple-react-modal';
import { slide as Menu } from 'react-burger-menu';
import config from '../config.json';
import { facebookResponse } from '../actions';


class NavBar extends React.Component {
  // _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      // isMenuOpened: false,
    };

    // this.toggleDropDownMenu = this.toggleDropDownMenu.bind(this);
  }

  // componentDidMount() {
  //   this._isMounted = true;
  // }

  renderLogIn = () => {
    if (this.props.auth.isAuthenticated) {
      return (
        <NavLink to={`/users/${this.props.auth.user._id}`} className="nav-link">
          <li className="nav-item menu-list-item">
            <span role="img" aria-label="see events" className="emoji">&#128075;</span>
            My Profile
          </li>
        </NavLink>
      );
    } else {
      return (
        <li className="nav-item menu-list-item">
          <NavLink to="/" className="nav-link">
            <span role="img" aria-label="see events" className="emoji">&#128075;</span>
            {/* Login with Facebook */}
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

  close = () => {
    this.setState({ show: false });
  }

  showSettings(event) {
    event.preventDefault();
  }


  // toggleDropDownMenu = () => {
  //   this.setState({ isMenuOpened: false });
  //   console.log(this.isMenuOpened);
  // }

  // toggleDropDownMenu(event) {
  //   console.log(this.isMenuOpened);
  //   this.setState(prevState => ({
  //     isMenuOpened: !prevState.isMenuOpened,
  //   }));
  //   this.setState({ isMenuOpened: true });
  //   const dropDownMenu = document.getElementById('drop-down-menu');
  //   if (dropDownMenu) {
  //     dropDownMenu.style.display = 'block';
  //   }
  // }

  render() {
    // let menuStyle = {};

    // if (this.state.isMenuOpened) {
    //   menuStyle = {
    //     display: 'block',
    //   };
    // } else {
    //   menuStyle = {
    //     display: 'none',
    //   };
    // }
    if (this.props.auth.isAuthenticated) {
      return (
        <nav>
          {/* Hamburger Menu -- Start */}
          {/* <i className="fas fa-bars" id="hamburger-menu" onClick={this.toggleDropDownMenu.bind(this)} />
          <div id="drop-down-menu" style={menuStyle}>
            <ul className="drop-down-menu-list">
              <NavLink to="/" exact className="nav-link">
                <li className="menu-list-item">
                  <span role="img" aria-label="home" className="emoji">&#11088;</span>
                  Home
                </li>
              </NavLink>
              <NavLink to="/createEvent" exact className="nav-link">
                <li className="menu-list-item">
                  <span role="img" aria-label="see events" className="emoji">&#127927;</span>
                  Create Event
                </li>
              </NavLink>
              {this.renderLogIn()}
            </ul>
          </div> */}
          <Menu>
            <button type="button" id="home" className="menu-item" href="/">Home</button>
            <button type="button" id="about" className="menu-item" href="/about">About</button>
            <button type="button" id="contact" className="menu-item" href="/contact">Contact</button>
            <button type="button" onClick={this.showSettings} className="menu-item--small" href="">Settings</button>
          </Menu>
          {/* Hamburger Menu -- End */}
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
          {/* Hamburger Menu -- Start */}
          {/* <i className="fas fa-bars" id="hamburger-menu" onClick={this.toggleDropDownMenu.bind(this)} />
          <div id="drop-down-menu" style={menuStyle}>
            <ul className="drop-down-menu-list">
              <NavLink to="/" exact className="nav-link">
                <li className="menu-list-item">
                  <span role="img" aria-label="home" className="emoji">&#11088;</span>
                  Home
                </li>
              </NavLink>
              <NavLink to="/createEvent" exact className="nav-link">
                <li className="menu-list-item">
                  <span role="img" aria-label="see events" className="emoji">&#127927;</span>
                  Create Event
                </li>
              </NavLink>
              {this.renderLogIn()}
            </ul>
          </div> */}
          <Menu>
            <button type="button" id="home" className="menu-item" href="/">Home</button>
            <button type="button" id="about" className="menu-item" href="/about">About</button>
            <button type="button" id="contact" className="menu-item" href="/contact">Contact</button>
            <button type="button" onClick={this.showSettings} className="menu-item--small" href="">Settings</button>
          </Menu>
          {/* Hamburger Menu -- End */}
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
            className="error-modal" // this will completely overwrite the default css completely
            containerClassName="test"
            closeOnOuterClick
            show={this.state.show}
            onClose={() => this.close()}
          >
            <div className="error-prompt">
              &#x26A0; You must be logged in to create a new event!
              <button className="error-close"
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
