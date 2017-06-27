import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleUpdateBio, toggleUpdatePassword } from '../actions/Toggle.jsx';

class User_Profile extends Component {

  renderBio(user){
    return (
      <div>
        <div className="profile-avatar">
          <img src="https://images.pexels.com/photos/261577/pexels-photo-261577.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" />
          <img className="avatar" src="../../assets/img/user.png" />
          <div className="info text-center">
            <h3>{user.name}</h3>
            <h4>{user.username}</h4>
            <small className="update-profile-btn form-text text-muted" onClick={this.props.toggleUpdatePassword.bind(this)}>Update Password</small>
          </div>
        </div>
        <div className="profile-info">
          <h3>About
            <small
              className="update-profile-btn form-text text-muted pull-right"
              onClick={this.props.toggleUpdateBio.bind(this)}>
              Edit
            </small>
          </h3>

          <p><span className="glyphicon glyphicon-envelope"></span>{user.email}</p>
          <p><span className="glyphicon glyphicon-phone"></span>{user.phone}</p>
          <p><i className="fa fa-birthday-cake" aria-hidden="true"></i>{user.dob}</p>
          <p><span className="glyphicon glyphicon-user"></span>{user.type}</p>
        </div>
      </div>
    );
  }

  render(){
    if(!this.props.user){
      var user = {
        name: 'Fetching...',
        username: 'Fetching...',
        email: 'Fetching...',
        phone: 'Fetching...',
        dob: 'Fetching...',
        type: 'Fetching...'
      }
      return (
        <div className="col-md-3">
          {this.renderBio(user)}
        </div>
      );
    }
    var user = {
      name: this.props.user.name,
      username: `@${this.props.user.username}`,
      email: this.props.user.email,
      phone: this.props.user.phone,
      dob: this.props.user.dob,
      type: this.props.user.type.toUpperCase()
    }
    return (
      <div className="col-md-3">
        {this.renderBio(user)}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleUpdateBio, toggleUpdatePassword
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(User_Profile);
