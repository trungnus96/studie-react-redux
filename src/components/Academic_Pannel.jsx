import React, { Component } from 'react';
import Loader from 'halogen/PulseLoader';

export default class Academic_Pannel extends Component {

  render(){
    const classname = `academic_pannel ${this.props.class} col-md-4 text-center`;
    return (
      <div className={classname}>
        {this.props.type}
        <div className="number">
          {this.props.isFetching && <Loader color="white" size="10px" margin="4px"/> }
          {!this.props.isFetching && this.props.academic_data &&  this.props.academic_data.length}
        </div>
      </div>
    );
  }
}
