import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateCurrentUser } from '../actions';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: '',
    };
  }

  startEdit = () => {
    this.setState({
      isEditing: true,
      name: this.props.currentUser.name,
    });
  }

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = () => {
    const update = {
      id: this.props.currentUser._id,
      name: this.state.name,
    };
    this.props.updateCurrentUser(update);
    this.setState({
      isEditing: false,
    });
  }

  renderUserProfile = () => {
    if (!this.state.isEditing) {
      return (
        <div className="event">
          <p>Name: {this.props.currentUser.name}</p>
          <p>Events Attended: </p>
          {this.props.currentUser.eventsAttended.map(event => (
            <li> { event.title } </li>
          ))}
          <p>Events Hosted: </p>
          {this.props.currentUser.eventsHosted.map(event => (
            <li> {event.title} </li>
          ))}
          <p>Followers: </p>
          {this.props.currentUser.followers.map(follower => (
            <li> {follower.name} </li>
          ))}
          <button type="button" onClick={this.startEdit}> Update </button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Update just your name for now</h2>
          <form>
            Name:<br />
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Name"
              onChange={this.onFieldChange}
            />
            <br />

            <br /><br />
            <button type="button" onClick={this.submitForm}> Submit </button>
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="allEvents">
        {this.renderUserProfile()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    currentUser: state.users.currentUser,
  }
);

export default withRouter(connect(mapStateToProps, { updateCurrentUser })(UserProfile));
