import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleSchoolForm,
        toggleDegreeDetail,
        toggleNoUpdate } from '../actions/Toggle.jsx';

import School_Detail from './School_Detail.jsx';
import Degree_Detail from './Degree_Detail.jsx';
import School_Form from './School_Form.jsx';
import Degree_Form from './Degree_Form.jsx';
import Mark_Form from './Mark_Form.jsx';

class Studie_Page extends Component {

  constructor(props){
    super(props);

    this.state = {
      school: {},
      degree: {}
    }

    this.getSchoolAndDegree = this.getSchoolAndDegree.bind(this);
  }

  getSchoolAndDegree(school, degree){
    this.setState({
      school: school,
      degree: degree
    });
    this.props.toggleDegreeDetail();
  }

  render(){
    return (
      <div className="studie_page col-md-12">
        <div className="text-right">
          <button
            className="btn btn-primary studie-btn"
            onClick={() => {this.props.toggleNoUpdate(); this.props.toggleSchoolForm();}}
            disabled={!this.props.isEnabled}>
            Add School
          </button>
        </div>
        {/* FROMS */}
        {this.props.toggle.isSchoolForm && <School_Form />}
        {this.props.toggle.isDegreeForm && <Degree_Form schools={this.props.schools}/>}
        {this.props.toggle.isMarkForm && <Mark_Form schools={this.props.schools} degrees={this.props.degrees}/>}
        {/* SCHOOL DETAIL */}
        {this.props.toggle.isSchoolDetail &&
          <div>
            {/* When there is no school for this user */}
            {!this.props.schools.isFetching && this.props.schools.schools.length == 0 &&
              <div className="empty">
                You have no Schools. Please add one<i className="fa fa-smile-o"/>
              </div>}

            {/* When there are schools for this user */}
            {this.props.schools.schools.map(school => {
              const degrees = this.props.degrees.degrees.filter(degree => {
                return degree.school_id === school._id
              })
              return (
              <div key={school._id}>
                <School_Detail school={school} degrees={degrees} callback={this.getSchoolAndDegree}/>
              </div>)
            })}
          </div>
        }
        {/* DEGREE DETAIL */}
        {this.props.toggle.isDegreeDetail && <Degree_Detail academic_data={this.state}/>}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSchoolForm,
    toggleDegreeDetail,
    toggleNoUpdate
  }, dispatch);
}

function mapStateToProps({ schools, degrees, marks, toggle }) {
  return {
    schools,
    degrees,
    marks,
    toggle,
    isEnabled: !schools.isFetching && !degrees.isFetching && !marks.isFetching  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Studie_Page);
