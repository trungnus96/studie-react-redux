import React, { Component } from 'react';

export default class Academic_Pannel extends Component {

  render(){
    const classname = `academic_pannel ${this.props.class} col-md-4 text-center`;
    return (
      <div className={classname}>
        {this.props.type}
        <div className="number">
          {this.props.isFetching && <i className="fa fa-spinner fa-spin fa-fw"/> }
          {!this.props.isFetching && this.props.academic_data &&  this.props.academic_data.length}
        </div>
      </div>
    );
  }
}
