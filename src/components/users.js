import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  updateCurrentUser, logoutUser, fetchUser, followUser, unFollowUser,
} from '../actions';


class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  isObjectEmpty = (object) => {
    // empty object check adapted from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    return Object.entries(object).length === 0 && object.constructor === Object;
  }

  renderFollowers = () => {
    if (this.props.user.followers.length !== 0) {
      return this.props.user.followers.map((user) => {
        return (
          <div className="user" key={user.id}>
            {user.name}
          </div>
        );
      });
    } else {
      return (
        <div>
          No followers yet
        </div>
      );
    }
  }

  renderFollowing = () => {
    if (this.props.user.following.length !== 0) {
      return this.props.user.following.map((user) => {
        return (
          <div className="user" key={user.id}>
            {user.name}
          </div>
        );
      });
    } else {
      return (
        <div>
          No following yet
        </div>
      );
    }
  }

  renderUsers = () => {
    if (this.props.match.path === '/users/:userId/followers') {
      return this.renderFollowers();
    } else if (this.props.match.path === '/users/:userId/following') {
      return this.renderFollowing();
    } else {
      return null;
    }
  }

  render() {
    if (this.props.match.params.userId !== this.props.user.id) {
      this.props.fetchUser(this.props.match.params.userId);
    }
    if (!this.isObjectEmpty(this.props.user)) {
      const content = this.props.auth
        ? (
          <div id="user-profile">
            {this.renderUsers()}
          </div>
        )
        : (
          <div>
            Redirect back to home page here.
          </div>
        );
      return (
        <div>{content}</div>
        // <div>test</div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => (
  {
    user: state.users.user,
    auth: state.auth.isAuthenticated,
    loggedUser: state.auth.user,
  }
);

export default withRouter(connect(mapStateToProps, {
  updateCurrentUser, logoutUser, fetchUser, followUser, unFollowUser,
})(Followers));
