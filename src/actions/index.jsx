import axios from 'axios';
import jwtDecode from 'jwt-decode';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT'

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

function receiveLogin(token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function receiveLogout() {
  return {
    type: LOGOUT,
    isAuthenticated: false
  }
}

// login
export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: creds
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin())

    return axios.post('http://localhost:8080/users/authenticate', creds)
      .then(response => {
        if(!response.data.success) {
          dispatch(loginError(response.data.msg));
        }else{
          localStorage.setItem('token', response.data.token);
          dispatch(receiveLogin(response.data.token));
          // this.receiveLogin();
          //var decoded = jwtDecode(response.data.token);
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

// validate token
export function validateToken(token) {
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json', 'Authorization': token }
  }

  return dispatch => {
    return axios.get('http://localhost:8080/users/validateToken', config)
      .then(response => {
        dispatch(receiveLogin(token));
      })
      .catch(err => {
        dispatch(logoutUser());
        // localStorage.clear();
        // location.reload();
      })
  }
}

  // logout
export function logoutUser() {
  return dispatch => {
    localStorage.clear();
    dispatch(receiveLogout())
  }
}
