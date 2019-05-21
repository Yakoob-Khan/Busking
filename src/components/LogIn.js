/* eslint-disable react/no-unused-state */
/* eslint-disable no-restricted-globals */
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import config from '../config.json';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, user: null, token: '' };
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null });
  };

  facebookResponse = (response) => {
    console.log(response);
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    };
    fetch('http://localhost:9090/auth/facebook', options).then((r) => {
      const token = r.headers.get('x-auth-token');
      r.json().then((user) => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
        }
      });
    });
  };

  onFailure = (error) => {
    // eslint-disable-next-line no-alert
    alert(error);
  }

  render() {
    const content = this.state.isAuthenticated
      ? (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
            {this.state.user.name}
            <img alt="profile" src={this.state.user.photo} />
            {console.log(this.state.user)}
          </div>
          <div>
            <button onClick={this.logout} className="button" type="submit">
                    Log out
            </button>
          </div>
        </div>
      )
      : (
        <div>
          <FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse}
          />
        </div>
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default LogIn;
