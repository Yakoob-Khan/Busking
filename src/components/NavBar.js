import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../style.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav>
        <ul className="navbar">
          <li className="nav-item">
            <NavLink to="/" exact className="nav-link">
              <span role="img" aria-label="home" className="emoji">&#11088;</span>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/createEvent" exact className="nav-link">
              <span role="img" aria-label="see events" className="emoji">&#127927;</span>
              Create Event
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              <span role="img" aria-label="see events" className="emoji">&#128075;</span>
              Login with Facebook
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     auth: state.auth.authenticated,
//   };
// }

export default withRouter(connect(null, null)(NavBar));
