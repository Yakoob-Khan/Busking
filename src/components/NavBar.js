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
          <NavLink to="/" exact className="nav-item">
            HOME
          </NavLink>
          <NavLink to="/createEvent" exact className="nav-item">
            CREATE EVENT
          </NavLink>
          <NavLink to="/login" className="nav-item">
            LOG IN WITH FACEBOOK
          </NavLink>
          {/* <NavLink to="/signup" className="nav-item">
            SIGN UP
          </NavLink> */}
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
