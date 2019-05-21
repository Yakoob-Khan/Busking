import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../style.scss';
import Events from './events';

const Landing = () => {
  return (
    <div>
      <div id="landing">
        <img
          src="https://wallpapercave.com/wp/zvYkBIM.jpg"
          alt="street"
          id="landing-image"
        />
        <h1 id="landing-title">Welcome to Busking.</h1>
        <p id="landing-subtitle">See who&apos;s performing anywhere.</p>
      </div>
      <Events />
    </div>
  );
};

export default withRouter(connect(null, null)(Landing));
