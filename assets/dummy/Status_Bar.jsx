import React, {Component} from 'react';
import _ from 'lodash';

export default class Status_Bar extends Component {

  constructor(props){
    super(props);
    this.state = { isDisplay: true };
  }

  // componentDidMount(){
  //   this.setState( {isDisplay: true} );
  //   setTimeout(() => {
  //     this.setState( {isDisplay: false} );
  //   }, 4000);
  // }

  isFetching(){
    return (
      <span><i className="fa fa-spinner fa-spin fa-fw" /></span>
    );
  }

  finished(){
    return (
      <span><i className="fa fa-check-circle animated zoomIn" style={{color:'green'}} /></span>
    );
  }

  renderHelper() {
    return _.map(this.props.stuff, (stuff, index) => {
      //stuff.isStudie == null -> prevent toggle_props is passed to this
      if (typeof stuff === 'object' && stuff.isStudie == null) {
        return (
          <p key={index}>
              {stuff.message} {stuff.isFetching && this.isFetching()} {!stuff.isFetching && this.finished()}
          </p>
        )
      }
    })
  }

  render() {
    console.log('status: ', this.props);
    return (
      <div className="status_bar col-md-12">
        {this.state.isDisplay && this.renderHelper()}
      </div>
    );
  }
}
