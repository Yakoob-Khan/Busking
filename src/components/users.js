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
            <div className="follower" key={user.id}>
              <img src={user.photo} alt="follower-profile" className="follower-profile-pic" />
              {user.name}
              <div className="follower-average-event-rating">
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
          No followers yet <span role="img" aria-label="unamused face">&#128530;</span>
        </div>
      );
    }
  }

  renderFollowing = () => {
    if (this.props.user.following.length !== 0) {
      return this.props.user.following.map((user) => {
        return (
          <Link key={user.id} to={`/users/${user.id}`}>
            <div className="following" key={user.id}>
              <img src={user.photo} alt="following-profile" className="following-profile-pic" />
              {user.name}
              <div className="following-average-event-rating">
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
          No following yet <span role="img" aria-label="unamused face">&#128530;</span>
        </div>
      );
    }
  }

  // renderUsers = () => {
  //   if (this.props.match.path === '/users/:userId/followers') {
  //     return (
  //       <div className="users-container">
  //         Followers:
  //         {this.renderFollowers()}
  //       </div>
  //     );
  //   } else if (this.props.match.path === '/users/:userId/following') {
  //     return (
  //       <div className="users-container">
  //         Following:
  //         {this.renderFollowing()}
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // }

  renderUsers = () => {
    if (this.props.option === 'followers') {
      return (
        <div className="users-container">
          <h2>Followers:</h2>
          {this.renderFollowers()}
        </div>
      );
    } else if (this.props.option === 'following') {
      return (
        <div className="users-container">
          <h2>Following:</h2>
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
