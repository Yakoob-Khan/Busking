import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../style.scss';
import Events from './events';
import { updateStripeId } from '../actions';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // if (this.props.state && !this.state.stripe_user_id) {
    //   const code = window.location.search.split('=')[2];

    //   axios.post('http://localhost:9090/api/stripeAccount',
    //     { code })
    //     .then((response) => {
    //       this.setState({ stripe_user_id: response.data.stripe_user_id });
    //       const updatedUser = {
    //         id: this.props.state.auth.user.id,
    //         stripeId: this.state.stripe_user_id,
    //       };
    //       this.props.updateStripeId(updatedUser);
    //     })
    //     .catch(err => console.log(err));
    // }
    return (
      <div>
        <div id="landing">
          <h1 id="landing-title">Welcome to</h1>
          <h1 id="landing-title-app-name">Busking</h1>
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
    reduxState: state,
  }
);


export default withRouter(connect(mapStateToProps, { updateStripeId })(Landing));
