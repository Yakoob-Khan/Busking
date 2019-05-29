/* eslint-disable jsx-a11y/anchor-is-valid */
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
      menuOpen: false,
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

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
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
    const styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px',
      },
      bmBurgerBars: {
        background: '#373a47',
      },
      bmBurgerBarsHover: {
        background: '#a90000',
      },
      bmCrossButton: {
        height: '24px',
        width: '24px',
      },
      bmCross: {
        background: '#bdc3c7',
      },
      bmMenuWrap: {
        position: 'fixed',
        height: '100%',
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
      },
      bmMorphShape: {
        fill: '#373a47',
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
      },
      bmItem: {
        display: 'inline-block',
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
      },
    };
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
          <Menu
            styles={styles}
            isOpen={this.state.menuOpen}
            onStateChange={state => this.handleStateChange(state)}
          >
            <ul className="hamburgerbar">
              <NavLink to="/" exact className="nav-link">
                <li className="menu-item">
                  <span role="img" aria-label="home" className="emoji">&#11088;</span>
                Home
                </li>
              </NavLink>
              <NavLink to="/createEvent" exact className="nav-link">
                <li className="menu-item">
                  <span role="img" aria-label="see events" className="emoji">&#127927;</span>
                Create Event
                </li>
              </NavLink>
              <NavLink to={`/users/${this.props.auth.user._id}`} className="nav-link">
                <li className="menu-item menu-list-item">
                  <span role="img" aria-label="see events" className="emoji">&#128075;</span>
            My Profile
                </li>
              </NavLink>
            </ul>

            <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
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
          <Menu
            styles={styles}
            isOpen={this.state.menuOpen}
            onStateChange={state => this.handleStateChange(state)}
          >
            <NavLink to="/" exact className="nav-link">
              <li className="menu-item">
                <span role="img" aria-label="home" className="emoji">&#11088;</span>
                Home
              </li>
            </NavLink>
            <NavLink to="/createEvent" exact className="nav-link">
              <li className="menu-item">
                <span role="img" aria-label="see events" className="emoji">&#127927;</span>
                Create Event
              </li>
            </NavLink>
            <NavLink to="/" className="nav-link">
              <li className="menu-item">
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
              </li>
            </NavLink>
            <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
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
