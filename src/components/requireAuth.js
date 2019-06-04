
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class requireAuth extends Component {
    componentWillMount() {
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = reduxState => (
    {
      authenticated: reduxState.auth.isAuthenticated,
    }
  );


  return connect(mapStateToProps, null)(requireAuth);
}
