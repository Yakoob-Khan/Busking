import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import { updateCurrentUser, logoutUser, fetchUser } from '../actions';


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
    // console.log(this.props.user);
    if (this.props.user.eventsHosted.length !== 0) {
      return this.props.user.eventsHosted.map((event) => {
        const eventStyle = {
          backgroundImage: `url(${event.imageURL})`,
        };
        return (
          <div className="event-container" key={event.id}>
            <Link className="view-details" key={event.id} to={`events/${event.id}`}>
              <div className="event" key={event.id} style={eventStyle} />
            </Link>
            <p className="event-title">
              {event.title}
            </p>
            {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
            <div className="event-rating">
              <Ratings
                rating={event.averageRating}
                widgetRatedColors="white"
                widgetEmptyColors="#6B6B6B"
                widgetSpacings="4px"
                widgetDimensions="30px"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </div>
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
          <div className="event-container" key={event.id}>
            <Link className="view-details" key={event.id} to={`events/${event.id}`}>
              <div className="event" key={event.id} style={eventStyle} />
            </Link>
            <p className="event-title">
              {event.title}
            </p>
            {/* Ratings credit to: https://github.com/ekeric13/react-ratings-declarative */}
            <div className="event-rating">
              <Ratings
                rating={event.averageRating}
                widgetRatedColors="white"
                widgetEmptyColors="#6B6B6B"
                widgetSpacings="4px"
                widgetDimensions="30px"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </div>
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

  render() {
    if (!this.isObjectEmpty(this.props.user)) {
      const content = this.props.auth
        ? (
          <div>
            <button onClick={this.props.logoutUser} className="button" type="submit">
                    Log out
            </button>
            <div className="user-pic">
              <img src={this.props.user.photo} alt="Profile Pic" />
            </div>
            <div className="user-name">
              <p>{this.props.user.name}</p>
            </div>
            <div className="user-email">
              <p>{this.props.user.email}</p>
            </div>
            <div id="event-average-rating">
              <Ratings
                rating={this.props.user.averageRating}
                widgetRatedColors="#0099CC"
                widgetHoverColors="rgb(0,153,204)"
                widgetEmptyColors="#6B6B6B"
                widgetSpacings="3px"
                widgetDimensions="32px"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
              <p id="event-average-rating-label">
              Average Rating: {this.props.user.averageRating ? this.props.user.averageRating.toFixed(2) : ''}
              </p>
            </div>
            <div className="events-hosted">
              <p>Events Hosted:</p>
              {this.renderEventsHosted()}
            </div>
            <div className="events-attended">
              <p>Events Attended:</p>
              {this.renderEventsAttended()}
            </div>
            <div className="followers">
              <p>Followers:</p>
              {this.renderFollowers()}
            </div>
            <div className="following">
              <p>Following:</p>
              {this.renderFollowing()}
            </div>
          </div>
        )
        : (
          <div>
          Please authenticate
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
  }
);

export default withRouter(connect(mapStateToProps, { updateCurrentUser, logoutUser, fetchUser })(UserProfile));
