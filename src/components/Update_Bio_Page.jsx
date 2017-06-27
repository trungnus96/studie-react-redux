import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';

import { toggleDefault } from '../actions/Toggle.jsx';
import { updateProfile } from '../actions/User.jsx';

class Update_Bio_Page extends Component {

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
          type="text"
          placeholder={placeholder}
          {...field.input}
          disabled={this.props.isFetching}/>
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.setState({ showModal: true });
    const data = {
      username: values.username,
      name: values.name,
      dob: values.dob,
      email: values.email,
      phone: values.phone
    }
    this.props.updateProfile(data);
  }

  render() {
    const { handleSubmit, pristine, submitting, reset, isFetching } = this.props;
    return (
      <div className="update_profile_page col-md-12">
        <div className="toggle-default pull-right" onClick={this.props.toggleDefault.bind(this)}>Close</div>
        <h4>Update profile</h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Name"
            name="name"
            placeholder="Name"
            component={this.renderField.bind(this)}/>
          <Field
            label="Date of Birth"
            name="dob"
            placeholder="Date of Birth"
            component={this.renderField.bind(this)}/>
          <Field
            label="Email"
            name="email"
            placeholder="Email"
            component={this.renderField.bind(this)}/>
          <Field
            label="Phone"
            name="phone"
            placeholder="Phone"
            component={this.renderField.bind(this)}/>
          <button type="submit" className="btn btn-primary studie-btn" disabled={pristine || submitting}>Update</button>
          <button type="button" className="btn btn-info studie-btn" disabled={pristine || submitting} onClick={reset}>
            Reset
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
  if(!values.name || values.name.length < 3){
    errors.name = "Enter a title that is at least 3 characters!";
  }

  if(!values.dob){
    errors.dob = "Enter a categories!";
  }

  if(!values.email){
    errors.email = "Enter a content!";
  }

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleDefault, updateProfile
  }, dispatch);
}

Update_Bio_Page = reduxForm({
  form: 'updateProfile',
  validate
})(Update_Bio_Page);

// You have to connect() to any reducers that you wish to connect to yourself
Update_Bio_Page = connect(
  state => ({
    initialValues: state.user.user,
    isFetching: state.user.isFetching,
    message: state.user.message
  }), mapDispatchToProps
)(Update_Bio_Page);

export default Update_Bio_Page;
