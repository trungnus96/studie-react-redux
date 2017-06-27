import React, { Component } from 'react';
import _ from 'lodash';

import { Modal } from 'react-bootstrap';

export function MyModal(props) {
  return (
    <Modal bsSize="small" show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.additional_button_name && _.split(props.message, '<br>').map((word, index) => {
          return (<div key={index}>{word}</div>)
        })}
        {!props.additional_button_name && props.message}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={props.onHide}>Close</button>
        {props.additional_button_name && <button className="btn btn-danger" onClick={props.action_on_additional_button}>{props.additional_button_name}</button>}
      </Modal.Footer>
    </Modal>
  );
}
