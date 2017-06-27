import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Modal } from 'react-bootstrap';

import {toggleDefault} from '../actions/Toggle.jsx';
import{ updatePassword } from '../actions/User.jsx';

class Update_Password_Form extends Component {

  constructor(props){
    super(props);
    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  renderField(field) {
    const { label, name, placeholder, meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label className="form-control-label" htmlFor={name}>{label}</label>
        <input
          className="form-control"
          type="password"
          placeholder={placeholder}
          {...field.input}/>
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.setState({ showModal: true });
    const data = {
      password: values.old_password,
      new_password: values.new_password
    }
    this.props.updatePassword(data).then(() => {
      this.props.reset();
      window.scrollTo(0, 0);
    });
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div className="update_bio_page col-md-12">
        <div className="toggle-default pull-right" onClick={this.props.toggleDefault.bind(this)}>Close</div>
        <h4>Update password</h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Old Password"
            name="old_password"
            placeholder="Old Password"
            component={this.renderField}/>
          <Field
            label="New Password"
            name="new_password"
            placeholder="New Password"
            component={this.renderField}/>
          <Field
            label="Re-type New Password"
            name="re_type_password"
            placeholder="Re-type New Password"
            component={this.renderField}/>
          <button type="submit" className="btn btn-primary studie-btn" disabled={pristine || submitting}>Update</button>
          <button type="button" className="btn btn-info studie-btn" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
          {/* MODAL - STARTS */}
          <Modal bsSize="small" show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.props.isFetching && this.props.message}
              {!this.props.isFetching && this.props.message}
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-primary" onClick={this.close.bind(this)}>Close</button>
            </Modal.Footer>
          </Modal>
          {/* MODAL - ENDS */}
        </form>
        <div className="toggle-default pull-right" onClick={this.props.toggleDefault.bind(this)}>Close</div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  //Validate the inputs from 'values'
  if(!values.old_password){
    errors.old_password = "Enter the old password";
  }

  if(!values.new_password){
    errors.new_password = "Enter a new password";
  }

  if(!values.re_type_password){
    errors.re_type_password = "Re-type the new password";
  }

  if(values.new_password && values.re_type_password){
    if(values.new_password != values.re_type_password){
      errors.re_type_password = "Password does not match!";
    }
  }

  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is valid
  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleDefault, updatePassword
  }, dispatch);
}

//
Update_Password_Form = reduxForm({
  form: 'UpdatePasswordForm',
  validate
})(Update_Password_Form);

// You have to connect() to any reducers that you wish to connect to yourself
Update_Password_Form = connect(
  state => ({
    isFetching: state.user.isFetching,
    message: state.user.message
  }), mapDispatchToProps
)(Update_Password_Form);

export default Update_Password_Form;
