import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.currentUser) {
        this.props.history.push('/');
      }
    }
    componentWillUpdate(nextProps) {
      if (nextProps.currentUser) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { currentUser: state.user.currentUser };
  }
  return connect(mapStateToProps)(NotAuthentication);
}
