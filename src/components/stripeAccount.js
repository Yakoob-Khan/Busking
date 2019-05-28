import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../style.scss';
import Events from './events';
import { updateStripeId } from '../actions';

class StripeAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    if (!this.props.user.stripe_user_id) {
      const code = window.location.search.split('=')[2];

      axios.post('https://busking-api.herokuapp.com/api/stripeAccount',
        { code })
        .then((response) => {
          // this.setState({ stripe_user_id: response.data.stripe_user_id });
          const updatedUser = {
            id: this.props.auth.user.id,
            stripeId: response.data.stripe_user_id,
          };
          this.props.updateStripeId(updatedUser);
          this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
        <div id="landing">
          <h1 id="landing-title">Welcome to</h1>
          <h1 id="landing-title-app-name">Stripe Account</h1>
          <p id="landing-subtitle">See who&apos;s performing everywhere.</p>
          <a href="#events-nearby" alt="down-arrow">
            <img
              src="https://www.evenements.france-galop.com/assets/images/arrow-down.png"
              alt="down-arrow"
              id="down-arrow"
            />
          </a>
        </div>
        <Events />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.users.user,
    auth: state.auth,
  }
);


export default withRouter(connect(mapStateToProps, { updateStripeId })(StripeAccount));
