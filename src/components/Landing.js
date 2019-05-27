import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../style.scss';
import Events from './events';
import { updateStripeId } from '../actions';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe_user_id: '',
    };
  }

  // componentDidMount() {
  //   // const { code } = window.location.href;
  //   // console.log(this.props.state);
  //   const code = window.location.search.split('=')[2];
  //   console.log('this is the code!');
  //   console.log(code);

  //   axios.post('http://localhost:9090/api/stripeAccount',
  //     { code })
  //     .then(response => console.log(response))
  //     .catch(err => console.log(err));
  // }
  componentDidUpdate() {
    // const { code } = window.location.href;
    // console.log(this.props.state);

  }

  render() {
    if (this.props.state) {
      const code = window.location.search.split('=')[2];
      console.log(JSON.stringify(code));


      axios.post('http://localhost:9090/api/stripeAccount',
        { code })
        .then((response) => {
        // const { stripe_user_id } = response.data.stripe_user_id;
        // console.log(response.data.stripe_user_id);
        // console.log(this.props.user);
          this.setState({ stripe_user_id: response.data.stripe_user_id });
          console.log(this.state.stripe_user_id);
          console.log(this.props.state.auth.user.id);
          const updatedUser = {
            id: this.props.state.auth.user.id,
            stripeId: this.state.stripe_user_id,
          };
          this.props.updateStripeId(updatedUser);
        })
        .catch(err => console.log(err));
    }
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
    state,
  }
);


export default withRouter(connect(mapStateToProps, { updateStripeId })(Landing));
