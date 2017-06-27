import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getUser} from '../actions/User.jsx';
import User_Profile from './User_Profile.jsx';
import Main_Page from './Main_Page.jsx';

class Home extends Component {

  componentWillMount(){
     this.props.getUser();
  }

  render(){
    const user_prop = {
      isFetching: this.props.user.isFetching,
      message: this.props.user.message
    }

    return (
      <div>Hello form Home
        <User_Profile user={this.props.user.user}/>
        <Main_Page />
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser
  }, dispatch);
}

function mapStateToProps({user}) {
  return { user: user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
