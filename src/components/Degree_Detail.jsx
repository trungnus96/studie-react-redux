import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import { MyModal as Modal } from './MyModal.jsx';
import { toggleSchoolDetail, toggleMarkForm, toggleMarkAdd,
      toggleMarkUpdate } from '../actions/Toggle.jsx';

import { deleteMarkById } from '../actions/Academic.jsx';

const initial_state = {
  on_confirm: false,
  on_delete: false,
  showModal: false,
  message: '',
  mark: {} };

class Degree_Detail extends Component {

  constructor(props){
    super(props);
    this.state = initial_state;
  }

  close() {
    this.setState(initial_state);
  }

  commit_delete_mark(mark) {
    const message = `Do you wish to delete this mark?
                    <br>${mark.subject_name}
                    <br>Subject Code: ${mark.subject_code}
                    <br>Mark: ${mark.mark}
                    <br>Semester: ${mark.semester}
                    <br>Year Level: ${mark.year_level}`;
    this.setState({ showModal: true, message: message, on_confirm: true, mark: mark });
  }

  updateMark(mark){
    const omitted_mark = _.omit(mark, ['username', 'school_id']);
    this.props.toggleMarkForm();
    this.props.toggleMarkUpdate(omitted_mark);
  }

  deleteMark(){
    this.setState({ on_confirm: false, on_delete: true });
    this.props.deleteMarkById(this.state.mark._id);
  }

  renderMarks(mark, index){
    return (
      <tr key={mark._id}>
        <td>{index+1}</td>
        <td>{mark.subject_name}</td>
        <td>{mark.subject_code}</td>
        <td>{mark.mark}</td>
        <td>Sem {mark.semester}, Year {mark.year_level}</td>
        <td>
          <span
            className="glyphicon glyphicon-edit school-button"
            data-tip
            data-for="editMark"
            onClick={() => {this.updateMark(mark)}}/>
          <ReactTooltip id="editMark">
            <span>Edit this Mark</span>
          </ReactTooltip>
          <span
            className="glyphicon glyphicon-trash school-button"
            data-tip
            data-for="removeMark"
            onClick={() => this.commit_delete_mark(mark)}/>
          <ReactTooltip id="removeMark">
            <span>Remove this Mark</span>
          </ReactTooltip>
        </td>
      </tr>
    );
  }

  render(){
    const marks = this.props.marks.marks.filter(mark => {
      return (mark.degree_id === this.props.academic_data.degree._id && mark.school_id === this.props.academic_data.school._id);
    });
    return (
      <div className="update_bio_page hihi">
        <div className="toggle-default text-right" onClick={this.props.toggleSchoolDetail.bind(this)}>Close</div>
        <div className="col-md-5">
          {this.props.academic_data.school.school_name}
          <br />
          <small>{this.props.academic_data.school.city}, {this.props.academic_data.school.state}, {this.props.academic_data.school.country}</small>
        </div>
        <div className="col-md-7">
          {this.props.academic_data.degree.degree_name}
          <br />
          <small>{this.props.academic_data.degree.duration} years</small>
        </div>
        <div
          className="glyphicon glyphicon-plus school-button pull-right"
          data-tip
          data-for="addMark"
          onClick={() => { this.props.toggleMarkAdd(this.props.academic_data.degree._id); this.props.toggleMarkForm()}} />
        <ReactTooltip id="addMark">
          <span>Add a Mark</span>
        </ReactTooltip>
        {/* When there are marks for this degree */}
        {!marks.length == 0 &&
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Code</th>
                <th>Mark</th>
                <th>Sem/Year</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, index) => this.renderMarks(mark, index))}
            </tbody>
          </table>}
        {/* When there is no marks for this degree */}
        {marks.length == 0 &&
          <div className="empty text-center">
            You have no Schools. Please add one<i className="fa fa-smile-o"/>
          </div>}
          {/* MODAL - STARTS */}
          <Modal show={this.state.showModal}
            onHide={this.close.bind(this)}
            title={(this.state.on_confirm && 'Confirmation') || (this.state.on_delete && 'Delete Mark')}
            message={(this.state.on_confirm && this.state.message) || (this.state.on_delete && this.props.message)}
            additional_button_name={this.state.on_confirm && 'Delete'}
            action_on_additional_button={this.deleteMark.bind(this)}/>
          {/* MODAL - ENDS */}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSchoolDetail,
    toggleMarkForm,
    toggleMarkAdd,
    toggleMarkUpdate,
    deleteMarkById
  }, dispatch);
}

function mapStateToProps({ marks }) {
  return { marks,
    isFetching: marks.isFetching,
    message: marks.messageOnStudie };
}

export default connect(mapStateToProps, mapDispatchToProps)(Degree_Detail);
