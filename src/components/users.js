import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
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
          <Link key={user.id} to={`/users/${user.id}`}>
            <div className="user" key={user.id}>
              <img src={user.photo} alt="profile" className="user-profile-pic" />
              {user.name}
              <div className="event-rating">
                <Ratings
                  rating={user.averageRating}
                  widgetRatedColors="#0099CC"
                  widgetEmptyColors="#6B6B6B"
                  widgetSpacings="1px"
                  widgetDimensions="12px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
              </div>
            </div>
          </Link>
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
          <Link key={user.id} to={`/users/${user.id}`}>
            <div className="user" key={user.id}>
              <img src={user.photo} alt="profile" className="user-profile-pic" />
              {user.name}
              <div className="event-rating">
                <Ratings
                  rating={user.averageRating}
                  widgetRatedColors="#0099CC"
                  widgetEmptyColors="#6B6B6B"
                  widgetSpacings="1px"
                  widgetDimensions="12px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
              </div>
            </div>
          </Link>
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
      return (
        <div classnmae="users-container">
          Followers:
          {this.renderFollowers()}
        </div>
      );
    } else if (this.props.match.path === '/users/:userId/following') {
      return (
        <div classnmae="users-container">
          Following:
          {this.renderFollowing()}
        </div>
      );
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
          this.renderUsers()
        )
        : (
          <div>
            Redirect back to home page here.
          </div>
        );
      return (
        <div className="content-container">{content}</div>
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
