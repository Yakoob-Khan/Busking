import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../style.scss';
import Events from './events';

const Landing = () => {
  return (
    <div>
      <div id="landing">
        <h1 id="landing-title">Welcome to</h1>
        <h1 id="landing-title-app-name">Busking</h1>
        <p id="landing-subtitle">See who&apos;s performing anywhere.</p>
      </div>
      <Events />
    </div>
  );
};

export default withRouter(connect(null, null)(Landing));
