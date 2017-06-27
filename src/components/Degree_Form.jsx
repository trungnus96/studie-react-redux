import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MyModal as Modal } from './MyModal.jsx';
import { toggleDefault, toggleDegreeUpdate } from '../actions/Toggle.jsx';
import { addDegree, updateDegree } from '../actions/Academic.jsx';

class Degree_Form extends Component {

  constructor(props){
    super(props);
    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  renderField(field) {
    const { label, name, placeholder, type, meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label className="form-control-label" htmlFor={name}>{label}</label>
        <input
          className="form-control"
          type={type}
          placeholder={placeholder}
          {...field.input}/>
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderSchoolField(field) {
    const { label, name, placeholder, schools, type, meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label className="form-control-label" htmlFor={name}>{label}</label>
        <select
          className="form-control"
          {...field.input}>
          <option value="">Select a school</option>
          {schools.map(school => {
            return (
              <option key={school._id} value={school._id}>{school.school_name}</option>
            );
          })}
        </select>
        <div className="help-block">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.setState({ showModal: true });
    const isAddDegree = (Object.getOwnPropertyNames(this.props.initialValues).length === 1);

    const school = this.props.schools.schools.find((item) => {
      return item._id == values.school_id});

    const degree = {
      degree_name: values.degree_name,
      duration: values.duration,
      school_name: school.school_name,
      school_id: values.school_id
    };
    if(isAddDegree){
      this.props.addDegree(degree).then(() => {
        this.props.reset();
      });
    }else{
      // console.log(values);
      const id = values._id;
      this.props.updateDegree(id, degree).then(() => {
        this.props.toggleDegreeUpdate(values);
      })
    }
  }

  render() {
    const isAddDegree = (Object.getOwnPropertyNames(this.props.initialValues).length === 1);
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div className="degree-form col-md-12">
        <div className="toggle-default pull-right" onClick={this.props.toggleDefault.bind(this)}>Close</div>
        <h4>
          {isAddDegree ? <span>Add Degree</span> : <span>Update Degree</span>}
        </h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Degree Name"
            name="degree_name"
            placeholder="Degree Name"
            type="text"
            component={this.renderField}/>
          <Field
            label="Duration (years)"
            name="duration"
            placeholder="Duration"
            type="number"
            component={this.renderField}/>
          <Field
            label="School"
            className="form-control"
            name="school_id"
            schools={this.props.schools.schools || []}
            component={this.renderSchoolField} />
          <button
            type="submit"
            className="btn btn-primary
            studie-btn"
            disabled={pristine || submitting}>
            {isAddDegree ? <span>Add</span> : <span>Update</span>}
          </button>
          <button type="button" className="btn btn-info studie-btn" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
          {/* MODAL - STARTS */}
          <Modal show={this.state.showModal}
            onHide={this.close.bind(this)}
            title={isAddDegree ? 'Add Degree' : 'Update Degree'}
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
  if(!values.degree_name){
    errors.degree_name = "Enter a degree name";
  }

  if(!values.duration){
    errors.duration = "Enter a duration";
  }

  if(!values.school_id){
    errors.school_id = "Please choose a school";
  }

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleDefault, addDegree, updateDegree, toggleDegreeUpdate
  }, dispatch);
}

Degree_Form = reduxForm({
  form: 'DegreeForm',
  validate
})(Degree_Form);

Degree_Form = connect(
  state => ({
    initialValues: state.updatedItem.degree,
    isFetching: state.degrees.isFetching,
    message: state.degrees.messageOnStudie || ''
  }), mapDispatchToProps
)(Degree_Form);

export default Degree_Form;
