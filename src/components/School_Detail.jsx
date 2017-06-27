import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactTooltip from 'react-tooltip';

import { MyModal as Modal } from './MyModal.jsx';
import { toggleShoolUpdate,
  toggleSchoolForm,
  toggleDegreeForm,
  toggleDegreeUpdate,
  toggleDegreeAdd } from '../actions/Toggle.jsx';

import { deleteDegreeById, deleteMarkByDegreeId, deleteMarkBySchoolId, deleteDegreeBySchoolId, deleteSchoolById } from '../actions/Academic.jsx';

const initial_state = {
  showModal: false,
  on_confirm: false,
  on_delete: false,
  on_school: false,
  on_degree: false,
  school: {},
  degree: {} };

class School_Detail extends Component {

  constructor(props){
    super(props);
    this.state = initial_state
  }

  close() {
    this.setState(initial_state);
  }

  commit_delete_school(school) {
    const message = `Do you wish to delete this school?
                    <br>${school.school_name}
                    <br>City: ${school.city}
                    <br>State: ${school.state}
                    <br>Country: ${school.country}`
    this.setState({ showModal: true, message: message, on_confirm: true, on_school: true, on_degree: false, school: school });
  }

  commit_delete_degree(degree) {
    const message = `Do you wish to delete this degree?
                    <br>${degree.degree_name}
                    <br>Duration: ${degree.duration} years`;
    this.setState({ showModal: true, message: message, on_confirm: true, on_school: false, on_degree: true, degree: degree });
  }



  deleteSchool(){
    this.setState({ on_confirm: false, on_delete: true });
    this.props.deleteMarkBySchoolId(this.state.school._id);
    this.props.deleteDegreeBySchoolId(this.state.school._id);
    this.props.deleteSchoolById(this.state.school._id);
  }

  deleteDegree(){
    this.setState({ on_confirm: false, on_delete: true });
    this.props.deleteMarkByDegreeId(this.state.degree._id);
    this.props.deleteDegreeById(this.state.degree._id);
  }

  updateSchool(school){
    this.props.toggleSchoolForm();
    this.props.toggleShoolUpdate(school);
  }

  updateDegree(degree){
    this.props.toggleDegreeForm();
    this.props.toggleDegreeUpdate(degree);
  }

  render(){
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.props.school.school_name}
            <span className="pull-right">
              <span
                className="glyphicon glyphicon-plus school-button"
                data-tip
                data-for="addDegree"
                onClick={() => {this.props.toggleDegreeAdd(this.props.school._id); this.props.toggleDegreeForm()}}
                />
              <ReactTooltip id="addDegree">
                <span>Add a Degree</span>
              </ReactTooltip>
              <span
                className="glyphicon glyphicon-edit school-button"
                data-tip
                data-for="editSchool"
                onClick={() => this.updateSchool(this.props.school)}/>
              <ReactTooltip id="editSchool">
                <span>Edit this School</span>
              </ReactTooltip>
              <span
                className="glyphicon glyphicon-trash school-button"
                data-tip
                data-for="removeSchool"
                onClick={() => this.commit_delete_school(this.props.school)}/>
              <ReactTooltip id="removeSchool">
                <span>Remove this School</span>
              </ReactTooltip>
            </span>
            <br />
            <small>{this.props.school.city}, {this.props.school.state}, {this.props.school.country}</small>
          </h3>
        </div>
        <div className="panel-body">
          {/* When there is no degree for this university */}
          {this.props.degrees.length == 0 &&
            <div className="empty text-center">
              You have no Degrees. Please add one<i className="fa fa-smile-o"/>
            </div>}

          {/* When there are degrees for this university */}
          {this.props.degrees.map(degree => {
            return (
              <div key={degree._id} className="row">
                <div className="col-md-5">
                  <ul className="degrees-list">
                    <li>{degree.degree_name}</li>
                    <li>{degree.duration} years</li>
                  </ul>
                </div>
                <div className="col-md-7">
                  <ul className="button-group">
                    <li>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.commit_delete_degree(degree)}>
                        Remove
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-info"
                        onClick={() => this.updateDegree(degree)}>
                        Edit
                      </button>
                    </li>
                    <li><button className="btn btn-primary" onClick={() => this.props.callback(this.props.school, degree)}>Show Marks</button></li>
                  </ul>
                </div>
              </div>
            );
          })}
          {/* MODAL - STARTS */}
          <Modal show={this.state.showModal}
            onHide={this.close.bind(this)}
            title={
              (this.state.on_confirm && 'Confirmation') ||
              (this.state.on_delete && (this.state.on_school && 'Delete School') || (this.state.on_degree && 'Delete Degree'))}
            message={
              (this.state.on_confirm && this.state.message) ||
              (this.state.on_delete &&
                (this.state.on_school &&
                  <div>
                    {this.props.messageFromMark}
                    <br/>
                    {this.props.messageFromDegree}
                    <br/>
                    {this.props.messageFromSchool}
                  </div>)
                ||
                (this.state.on_degree &&
                  <div>
                    {this.props.messageFromMark}
                    <br/>
                    {this.props.messageFromDegree}
                  </div>)
              )}
            additional_button_name={this.state.on_confirm && 'Delete'}
            action_on_additional_button={
              (this.state.on_school && this.deleteSchool.bind(this))
              ||
              (this.state.on_degree && this.deleteDegree.bind(this))
            }/>
            {/* MODAL - ENDS */}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleShoolUpdate,
    toggleSchoolForm,
    toggleDegreeForm,
    toggleDegreeUpdate,
    toggleDegreeAdd,
    deleteDegreeById,
    deleteMarkByDegreeId,
    deleteMarkBySchoolId,
    deleteDegreeBySchoolId,
    deleteSchoolById
  }, dispatch);
}

function mapStateToProps({ schools, degrees, marks }) {
  return { marks,
    isFetching: schools.isFetching || degrees.isFetching || marks.isFetching,
    messageFromSchool: schools.messageOnStudie,
    messageFromDegree: degrees.messageOnStudie,
    messageFromMark: marks.messageOnStudie };
}

export default connect(mapStateToProps, mapDispatchToProps)(School_Detail);
