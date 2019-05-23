
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class requireAuth extends Component {
    //   constructor(props) {
    //     super(props);
    //   }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
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
