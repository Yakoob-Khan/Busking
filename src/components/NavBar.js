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
          <li>
            <span role="img" aria-label="home">&#11088;</span>
            <NavLink to="/" exact className="nav-item">
              Home
            </NavLink>
          </li>
          <li>
            <span role="img" aria-label="see events">&#127927;</span>
            <NavLink to="/createEvent" exact className="nav-item">
              Create Event
            </NavLink>
          </li>
          <li>
            <span role="img" aria-label="see events">&#128075;</span>
            <NavLink to="/login" className="nav-item">
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
