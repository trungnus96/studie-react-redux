import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'halogen/RiseLoader';

import { getUser } from '../actions/User.jsx';
import { toggleUpdateBio, toggleUpdatePassword } from '../actions/Toggle.jsx';

class User_Profile extends Component {
  componentWillMount(){
     this.props.getUser();
  }

  render(){
      return (
        <div className="col-md-4">
          <div className="profile-avatar">
            <img src="https://images.pexels.com/photos/261577/pexels-photo-261577.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
            <img className="avatar" src="../../assets/img/user.png" />
            <div className="info text-center">
              {!this.props.isFetching && <div>
                <h3>{this.props.user.name}</h3>
                <h4>@{this.props.user.username}</h4>
                <small className="update-profile-btn form-text text-muted" onClick={this.props.toggleUpdatePassword.bind(this)}>Update Password</small>
              </div>}
              {this.props.isFetching &&
                <div className="loader">
                  <Loader color="white" size="10px"/>
                </div>}
            </div>
          </div>
          {!this.props.isFetching && <div>
            <div className="profile-info">
              <h3>About
                <small
                  className="update-profile-btn form-text text-muted pull-right"
                  onClick={this.props.toggleUpdateBio.bind(this)}>
                  Edit
                </small>
              </h3>
              <p><span className="glyphicon glyphicon-envelope"></span>{this.props.user.email}</p>
              <p><span className="glyphicon glyphicon-phone"></span>{this.props.user.phone}</p>
              <p><i className="fa fa-birthday-cake" aria-hidden="true"></i>{this.props.user.dob}</p>
              <p><span className="glyphicon glyphicon-user"></span>{this.props.user.type.toUpperCase()}</p>
            </div>
          </div>}
        </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser, toggleUpdateBio, toggleUpdatePassword
  }, dispatch);
}

function mapStateToProps({user}) {
  return {
    user: user.user,
    isFetching: user.isFetching
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User_Profile);
