import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { logoutUser } from '../actions/index.jsx';
import { MyModal as Modal } from './MyModal.jsx';

class NavBar extends Component {

  constructor(props){
    super(props);
    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  logout(){
    this.close();
    this.props.logoutUser();
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Studie</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              {this.props.isAuthenticated &&
              <li>
                <a style={{cursor: 'pointer'}}
                  onClick={() => {
                    this.setState({ showModal: true });
                    // this.props.history.push('/login');
                  }}>
                    Logout
                </a>
              </li>}
            </ul>
          </div>
        </div>
        {/* CONFIRMATION MODAL - STARTS */}
        <Modal show={this.state.showModal}
          onHide={this.close.bind(this)}
          title='Confirmation'
          message='Do you wish to logout'
          additional_button_name='Logout'
          action_on_additional_button={this.logout.bind(this)}/>
        {/* CONFIRMATION MODAL - ENDS */}
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return { isAuthenticated: auth.isAuthenticated };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
