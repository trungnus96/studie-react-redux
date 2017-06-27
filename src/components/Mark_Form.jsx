import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Modal } from 'react-bootstrap';
import _ from 'lodash';

import { MyModal as Modal } from './MyModal.jsx';
import { toggleDegreeDetail, toggleMarkUpdate } from '../actions/Toggle.jsx';
import { addMark, updateMark } from '../actions/Academic.jsx';

class Mark_Form extends Component {

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

  renderDegreeField(field) {
    const { label, name, placeholder, schools, degrees, type, meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;
    return (
      <div className={className}>
        <label className="form-control-label" htmlFor={name}>{label}</label>
        <select
          className="form-control"
          {...field.input}>
          <option value="">Select a degree</option>
          {degrees.map(degree => {
            const school_name = schools.find(school => {
              return school._id === degree.school_id
            }).school_name;
            return (
              <option key={degree._id} value={degree._id}>{degree.degree_name} - {school_name}</option>
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
    const degree = this.props.degrees.degrees.find((item) => {
      return item._id == values.degree_id});
    const mark = {
      subject_name: values.subject_name,
      subject_code: values.subject_code,
      semester: values.semester,
      year_level: values.year_level,
      mark: values.mark,
      degree_id: values.degree_id,
      school_id: degree.school_id
    }
    const isAddMark = (Object.getOwnPropertyNames(this.props.initialValues).length === 1);
    if(isAddMark){
      this.props.addMark(mark).then(() => {
        this.props.reset();
      });
    }else{
      const id = values._id;
      const omitted_mark = _.omit(mark, ['degree_id', 'school_id']);
      this.props.updateMark(id, omitted_mark).then(() => {
        this.props.toggleMarkUpdate(values);
      })
    }
  }

  render() {
    const isAddMark = (Object.getOwnPropertyNames(this.props.initialValues).length === 1);
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div className="mark-form col-md-12">
        <div className="toggle-default pull-right" onClick={this.props.toggleDegreeDetail.bind(this)}>Close</div>
        <h4>
          {isAddMark ? <span>Add Mark</span> : <span>Update Mark</span>}
        </h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Subject Name"
            name="subject_name"
            placeholder="Subject Name"
            type="text"
            component={this.renderField} />
          <Field
            label="Subject Code"
            name="subject_code"
            placeholder="Subject Code"
            type="text"
            component={this.renderField} />
          <Field
            label="Semester"
            name="semester"
            placeholder="Semester"
            type="number"
            component={this.renderField} />
          <Field
            label="Year Level"
            name="year_level"
            placeholder="Year Level"
            type="number"
            component={this.renderField} />
          <Field
            label="Mark"
            name="mark"
            placeholder="Mark"
            type="number"
            component={this.renderField}/>
          <Field
            label="Degree"
            className="form-control"
            name="degree_id"
            schools={this.props.schools.schools || []}
            degrees={this.props.degrees.degrees || []}
            component={this.renderDegreeField} />
          <button
            type="submit"
            className="btn btn-primary studie-btn"
            disabled={pristine || submitting}>
            {isAddMark ? <span>Add</span> : <span>Update</span>}
          </button>
          <button type="button" className="btn btn-info studie-btn" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
          {/* MODAL - STARTS */}
          <Modal show={this.state.showModal}
            onHide={this.close.bind(this)}
            title={isAddMark ? 'Add Mark' : 'Update Mark'}
            message={this.props.message}/>
          {/* MODAL - ENDS */}
        </form>
        <div className="toggle-default pull-right" onClick={this.props.toggleDegreeDetail.bind(this)}>Close</div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  //Validate the inputs from 'values'
  if(!values.subject_name){
    errors.subject_name = "Enter a subject name";
  }

  if(!values.subject_code){
    errors.subject_code = "Enter a subject code";
  }

  if(!values.semester){
    errors.semester = "Enter a semester";
  }

  if(!values.year_level){
    errors.year_level = "Enter a year level";
  }

  if(!values.mark){
    errors.mark = "Enter a semester";
  }

  if(!values.degree_id){
    errors.degree_id = "Please choose a degree";
  }

  //If errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is valid
  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addMark, toggleDegreeDetail, updateMark, toggleMarkUpdate
  }, dispatch);
}

//
Mark_Form = reduxForm({
  form: 'MarkForm',
  validate
})(Mark_Form);

// You have to connect() to any reducers that you wish to connect to yourself
Mark_Form = connect(
  state => ({
    initialValues: state.updatedItem.mark,
    isFetching: state.marks.isFetching,
    message: state.marks.messageOnStudie
  }), mapDispatchToProps
)(Mark_Form);

export default Mark_Form;
