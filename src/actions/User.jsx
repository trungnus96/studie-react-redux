import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const FETCHING_USER_REQUEST = 'FETCHING_USER_REQUEST';
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
export const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

const url = 'https://ancient-ocean-55048.herokuapp.com';
// const url = 'http://localhost:8080';

// GET DATA FROM API - STARTS
function requestUserData() {
  return {
    type: FETCHING_USER_REQUEST,
    isFetching: true
  }
}

function receiveUserData(user) {
  return {
    type: FETCHING_USER_SUCCESS,
    isFetching: false,
    user
  }
}

function requestDataError(message) {
  return {
    type: FETCHING_USER_FAILURE,
    isFetching: false,
    message
  }
}

export function getUser() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const username = decoded._doc.username;
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestUserData())
    return axios.get(`${url}/users/user/${username}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(requestDataError(response.data.msg));
        }
        else{
          dispatch(receiveUserData(response.data.user));
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// GET DATA FROM API - ENDS

// UPDATE PROFILE - STARTS
function requestUpdateUser() {
  return {
    type: UPDATE_USER_REQUEST,
    isFetching: true
  }
}

function receiveUpdateUser(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    isFetching: false,
    updated_data: user
  }
}

function updateUserError(message) {
  return {
    type: UPDATE_USER_FAILURE,
    isFetching: false,
    message
  }
}

export function updateProfile(data) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const id = decoded._doc._id;
  let config = {
    method: 'PUT',
    headers: { 'Content-Type':'application/json', 'Authorization': token }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestUpdateUser())
    return axios.put(`${url}/users/updateProfile/${id}`, data, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(updateUserError(response.data.msg));
        }
        else{
          dispatch(receiveUpdateUser(data));
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

// UPDATE PROFILE - ENDS


// UPDATE PASSWORD - STARTS
function requestUpdatePassword() {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    isFetching: true
  }
}

function receiveUpdatePassword() {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    isFetching: false,
  }
}

function updatePasswordError(message) {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    isFetching: false,
    message
  }
}

export function updatePassword(new_data) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const id = decoded._doc._id;
  const data = Object.assign({}, new_data, {
    username: decoded._doc.username
  })
  let config = {
    method: 'PUT',
    headers: { 'Content-Type':'application/json', 'Authorization': token }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestUpdatePassword())
    return axios.put(`${url}/users/updatePassword/${id}`, data, config)
      .then(response => {

        if(!response.data.success) {
          dispatch(updatePasswordError(response.data.msg));
        }
        else{
          dispatch(receiveUpdatePassword());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// UPDATE PASSWORD - ENDS
