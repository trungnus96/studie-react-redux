import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {validateToken} from '../actions/index.jsx';

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      console.log('will mount', this.props.isAuthenticated);
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      console.log('received', nextProps)
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if(!isAuthenticated){
        const token = localStorage.getItem('token');
        // if there is a token in localStorage, validate a token
        if(token){
          console.log('check?');
          return this.props.validateToken(token);
        }
        // if there is no token in localStorage, navigate to login page
        console.log('push?');
        return this.props.history.push('/login');
      }
    }

    render() {
      console.log('render?');
      return (
        <div>
          {this.props.token || this.props.isAuthenticated
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )
    }
  }

  const mapStateToProps = ({auth}) => ({
    isAuthenticated: auth.isAuthenticated,
    isFetching: auth.isFetching
  });

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      validateToken
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
