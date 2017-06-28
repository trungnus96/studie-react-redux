import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import User_Profile from './User_Profile.jsx';
import Main_Page from './Main_Page.jsx';

export default class Home extends Component {

  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-center-block">
            <User_Profile />
            <Main_Page />
          </div>
        </div>
      </div>
    );
  }
}
