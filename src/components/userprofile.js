import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import {
  updateCurrentUser, logoutUser, fetchUser, followUser, unFollowUser,
} from '../actions';


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  isObjectEmpty = (object) => {
    // empty object check adapted from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    return Object.entries(object).length === 0 && object.constructor === Object;
  }

  renderEventsHosted = () => {
    if (this.props.user.eventsHosted.length !== 0) {
      return this.props.user.eventsHosted.map((event) => {
        const eventStyle = {
          backgroundImage: `url(${event.imageURL})`,
        };
        return (
          <div className="hosted-event-container event-container" key={event.id}>
            <Link className="view-details" key={event.id} to={`/events/${event.id}`}>
              <div className="event" key={event.id} style={eventStyle} />
              <p className="event-title">{event.title}</p>
              <p className="event-description">{event.description}</p>
              <p className="event-address">{event.address}</p>
              {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
              <div className="event-rating">
                <Ratings
                  rating={event.averageRating}
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
            </Link>
          </div>
        );
      });
    } else {
      return (
        <div>
          No events yet
        </div>
      );
    }
  }

  renderEventsAttended = () => {
    if (this.props.user.eventsAttended.length !== 0) {
      return this.props.user.eventsAttended.map((event) => {
        const eventStyle = {
          backgroundImage: `url(${event.imageURL})`,
        };
        return (
          <div className="attended-event-container event-container" key={event.id}>
            <Link className="view-details" key={event.id} to={`/events/${event.id}`}>
              <div className="event" key={event.id} style={eventStyle} />
              <p className="event-title">{event.title}</p>
              <p className="event-description">{event.description}</p>
              <p className="event-address">{event.address}</p>
              {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
              <div className="event-rating">
                <Ratings
                  rating={event.averageRating}
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
            </Link>
          </div>
        );
      });
    } else {
      return (
        <div>
          No events yet
        </div>
      );
    }
  }

  getNumOfEventsAttended = () => {
    return this.props.user.eventsAttended.length;
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

  getNumOfFollowers = () => {
    return this.props.user.followers.length;
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

  getNumOfFollowing = () => {
    return this.props.user.following.length;
  }

  handleFollow = () => {
    this.props.followUser(this.props.user.id);
  }

  handleUnFollow = () => {
    this.props.unFollowUser(this.props.user.id);
  }

  renderFollowButton = () => {
    if (this.props.user.id !== this.props.loggedUser.id) {
      console.log(this.props.user.followers);
      if (this.props.user.followers.filter(follower => (follower.id === this.props.loggedUser.id)).length > 0) {
        return (
          <button type="button" id="unfollow-button" onClick={this.handleUnFollow}>unfollow</button>
        );
      } else if (this.props.user.followers.filter(follower => (follower.id === this.props.loggedUser.id)).length === 0) {
        return (
          <button type="button" id="follow-button" onClick={this.handleFollow}>follow</button>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderLogoutButton = () => {
    if (this.props.user.id === this.props.loggedUser.id) {
      return (
        <button onClick={this.props.logoutUser} id="log-out-button" className="button" type="submit">
        Log out
        </button>
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
          <div id="user-profile">
            <div id="user-profile-background" />
            <div id="user-profile-details-container">
              <div id="user-profile-details">
                <div id="user-profile-basic-details">
                  <img id="user-profile-picture" src={this.props.user.photo} alt={this.props.user.name} />
                  <p id="user-profile-name">{this.props.user.name}</p>
                  <p id="user-profile-email">{this.props.user.email}</p>
                  {this.renderFollowButton()}
                  {this.renderLogoutButton()}
                </div>
                <div id="user-profile-stats">
                  <div id="user-profile-stat-1" className="user-profile-stat">
                    <p id="user-profile-average-rating-label" className="user-profile-stat-label">Average Rating</p>
                    <p id="user-profile-average-rating" className="user-profile-stat-value">
                      {this.props.user.averageRating ? this.props.user.averageRating.toFixed(2) : 'No Ratings'}
                    </p>
                  </div>
                  <div id="user-profile-stat-2" className="user-profile-stat">
                    <p id="user-profile-followers-label" className="user-profile-stat-label">Followers</p>
                    <p id="user-profile-followers" className="user-profile-stat-value">{this.getNumOfFollowers()}</p>
                  </div>
                  <div id="user-profile-stat-3" className="user-profile-stat">
                    <p id="user-profile-following-label" className="user-profile-stat-label">Following</p>
                    <p id="user-profile-following" className="user-profile-stat-value">{this.getNumOfFollowing()}</p>
                  </div>
                  <div id="user-profile-stat-4" className="user-profile-stat">
                    <p id="user-profile-events-attended-label" className="user-profile-stat-label">Events Attended</p>
                    <p id="user-profile-events-attended" className="user-profile-stat-value">{this.getNumOfEventsAttended()}</p>
                  </div>
                </div>
              </div>
              <div id="user-profile-events-hosted-section">
                <div id="events-hosted-section-inner-div">
                  <p id="user-profile-events-hosted-label">Events Hosted</p>
                  <div id="hosted-events-grid">
                    {this.renderEventsHosted()}
                  </div>
                </div>
              </div>
              <div id="user-profile-events-attended-section">
                <div id="events-attended-section-inner-div">
                  <p id="user-profile-events-attended-title">Events Attended</p>
                  <div id="attended-events-grid">
                    {this.renderEventsAttended()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        : (
          <div>
            Redirect back to home page here.
          </div>
        );
      return (
        <div>{content}</div>
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
})(UserProfile));
