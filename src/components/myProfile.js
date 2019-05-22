import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateCurrentUser } from '../actions';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    console.log(this.props.user);
    return (
      <div>
        <div className="user-pic" />
        <div className="user-name">
          <p>{this.props.user.name}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.auth.user,
  }
);

export default withRouter(connect(mapStateToProps, { updateCurrentUser })(MyProfile));
