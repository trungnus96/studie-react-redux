import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { MyModal as Modal } from './MyModal.jsx';
import {loginUser} from '../actions/index.jsx';
import {validateToken} from '../actions/index.jsx';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showModal: false
    };
  }

  componentWillMount(){
    const token = localStorage.getItem('token');
    if(token){
      this.props.validateToken(token);

    }
  }

  componentWillReceiveProps(props){
    if(props.auth.isAuthenticated){
      this.props.history.push('/');
    }
    if(props.auth.errorMessage){
      this.setState({ showModal: true });
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  onSubmit(event) {
    event.preventDefault();
    //check username and password if empty
    const isEmpty = this.state.username.length > 0 && this.state.password.length > 0
      ? false
      : true;

    if (!this.props.auth.isFetching && !isEmpty) {
      const creds = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.loginUser(creds);
    }
  }

  onChange(event) {
    this.props.auth.errorMessage = '';
    if (event.target.name == 'username') {
      this.setState({username: event.target.value})
    } else {
      this.setState({password: event.target.value})
    }

  }

  renderInputField(state, change, name, type) {
    return (
      <div className="col-md-6 col-sm-8 col-xs-9">
        <input name={name} value={state} onChange={change} type={type} className="form-control"/>
      </div>
    );
  }

  render() {
    return (
      <div className="login-field container-fluid" style={{ textAlign: 'center' }}>
        <h1><strong><i className="fa fa-graduation-cap" aria-hidden="true"></i> Studie </strong> Management Console</h1>
        <h4><small>by </small> Trung Nguyen</h4>
        <div className="row">
          <div className="col-md-6 col-center-block">
            <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
              <fieldset>
                <div className="form-group">
                  <label htmlFor="username" className="col-md-4 col-sm-3 col-xs-3 control-label">Username</label>
                  {this.renderInputField(this.state.username, this.onChange.bind(this), 'username', 'text')}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="col-md-4 col-sm-3 col-xs-3 control-label">Password</label>
                  {this.renderInputField(this.state.password, this.onChange.bind(this), 'password', 'password')}
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" type="submit" disabled={this.props.auth.isFetching}>Login</button>
                </div>
                {this.props.auth.isFetching && <span>
                  <i className="fa fa-spinner fa-pulse fa-2x fa-fw"/>
                </span>}
              </fieldset>
            </form>
          </div>
        </div>

        <Modal show={this.state.showModal}
          onHide={this.close.bind(this)}
          title='Warning!'
          message={this.props.auth.errorMessage}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser, validateToken
  }, dispatch);
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
