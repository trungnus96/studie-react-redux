import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { MyModal as Modal } from './MyModal.jsx';
import { toggleDefault, toggleShoolUpdate } from '../actions/Toggle.jsx';
import { addSchool, updateSchool } from '../actions/Academic.jsx';

class School_Form extends Component {

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
          {...field.input}/>
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.setState({ showModal: true });
    const isAddSchool = (Object.getOwnPropertyNames(this.props.initialValues).length === 0);
    if(isAddSchool){
      this.props.addSchool(values).then(() => {
        this.props.reset();
      });
    }else{
      const school = _.omit(values, ["_id", "username"]);
      const id = values._id;
      this.props.updateSchool(id, school).then(() => {
        this.props.toggleShoolUpdate(values);
      });

    }
  }

  render() {
    const isAddSchool = (Object.getOwnPropertyNames(this.props.initialValues).length === 0);
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div className="school-form col-md-12">
        <div className="toggle-default pull-right" onClick={this.props.toggleDefault.bind(this)}>Close</div>
        <h4>
          {isAddSchool ? <span>Add School</span> : <span>Update School</span>}
        </h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="School Name"
            name="school_name"
            placeholder="School Name"
            component={this.renderField}/>
          <Field
            label="City"
            name="city"
            placeholder="City"
            component={this.renderField}/>
          <Field
            label="State"
            name="state"
            placeholder="State"
            component={this.renderField}/>
          <Field
            label="Country"
            name="country"
            placeholder="Country"
            component={this.renderField}/>
          <button
            type="submit"
            className="btn btn-primary studie-btn"
            disabled={pristine || submitting}>
            {isAddSchool ? <span>Add</span> : <span>Update</span>}
          </button>
          <button type="button" className="btn btn-info studie-btn" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>

          {/* MODAL - STARTS */}
          <Modal show={this.state.showModal}
            onHide={this.close.bind(this)}
            title={isAddSchool ? 'Add School' : 'Update School'}
            message={this.props.message}/>
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
  if(!values.school_name){
    errors.school_name = "Enter a school name";
  }

  if(!values.city){
    errors.city = "Enter a city";
  }

  if(!values.state){
    errors.state = "Enter a state";
  }

  if(!values.country){
    errors.country = "Enter a contry";
  }

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleDefault, addSchool, updateSchool, toggleShoolUpdate
  }, dispatch);
}

School_Form = reduxForm({
  form: 'SchoolForm',
  validate
})(School_Form);

School_Form = connect(
  state => ({
    initialValues: state.updatedItem.school,
    isFetching: state.schools.isFetching,
    message: state.schools.messageOnStudie || ''
  }), mapDispatchToProps
)(School_Form);

export default School_Form;
