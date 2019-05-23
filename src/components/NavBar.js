import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLogIn = () => {
    if (this.props.auth.isAuthenticated) {
      return (
        <NavLink to="/myprofile" className="nav-link">
          <li className="nav-item">
            <span role="img" aria-label="see events" className="emoji">&#128075;</span>
            My Profile
          </li>
        </NavLink>
      );
    } else {
      return (
        <NavLink to="/login" className="nav-link">
          <li className="nav-item">
            <span role="img" aria-label="see events" className="emoji">&#128075;</span>
            Login with Facebook
          </li>
        </NavLink>
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

export default withRouter(connect(mapStateToProps, { })(NavBar));
