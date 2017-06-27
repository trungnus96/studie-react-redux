import React, { Component } from 'react';
import Loader from 'halogen/PulseLoader';

export default class Academic_Pannel extends Component {

  render(){
    return (
      <div className="academic_pannel col-md-4">
        {this.props.isFetching && <Loader color="#2c3e50" size="14px" margin="4px"/> }
        {!this.props.isFetching && this.props.academic_data &&  this.props.academic_data.length}
      </div>
    );
  }
}
