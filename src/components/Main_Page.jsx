import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getSchools} from '../actions/Academic.jsx';
import {getDegrees} from '../actions/Academic.jsx';
import {getMarks} from '../actions/Academic.jsx';

import Academic_Pannel from './Academic_Pannel.jsx';
import Studie_Page from './Studie_Page.jsx';
import Update_Bio_Page from './Update_Bio_Page.jsx';
import Update_Password_Form from './Update_Password_Form.jsx';

class Main_Page extends Component {

  componentWillMount(){
    this.props.getSchools();
    this.props.getDegrees();
    this.props.getMarks();
  }

  render() {
    return (
      <div className="main-page col-md-8">
        <Academic_Pannel
          type='Schools'
          class='school'
          academic_data={this.props.schools.schools}
          isFetching={this.props.schools.isFetching}/>
        <Academic_Pannel
          type='Degrees'
          class='degree'
          academic_data={this.props.degrees.degrees}
          isFetching={this.props.schools.isFetching}/>
        <Academic_Pannel
          type='Marks'
          class='mark'
          academic_data={this.props.marks.marks}
          isFetching={this.props.schools.isFetching}/>
        {this.props.toggle.isStudie && <Studie_Page />}
        {this.props.toggle.isUpdateBio && <Update_Bio_Page />}
        {this.props.toggle.isUpdatePassword && <Update_Password_Form />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSchools, getDegrees, getMarks
  }, dispatch);
}

function mapStateToProps({schools, degrees, marks, user, toggle}) {
  return {
    user: user,
    schools: schools,
    degrees: degrees,
    marks: marks,
    toggle: toggle
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main_Page);
