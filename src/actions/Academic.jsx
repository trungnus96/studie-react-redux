import axios from 'axios';
import jwtDecode from 'jwt-decode';

// School
export const FETCHING_SCHOOL_REQUEST = 'FETCHING_SCHOOL_REQUEST';
export const FETCHING_SCHOOL_SUCCESS = 'FETCHING_SCHOOL_SUCCESS';
export const FETCHING_SCHOOL_FAILURE = 'FETCHING_SCHOOL_FAILURE';

export const ADDING_SCHOOL_REQUEST = 'ADDING_SCHOOL_REQUEST';
export const ADDING_SCHOOL_SUCCESS = 'ADDING_SCHOOL_SUCCESS';
export const ADDING_SCHOOL_FAILURE = 'ADDING_SCHOOL_FAILURE';

export const UPDATING_SCHOOL_REQUEST = 'UPDATING_SCHOOL_REQUEST';
export const UPDATING_SCHOOL_SUCCESS = 'UPDATING_SCHOOL_SUCCESS';
export const UPDATING_SCHOOL_FAILURE = 'UPDATING_SCHOOL_FAILURE';

export const DELETE_SCHOOL_BY_ID_REQUEST = 'DELETE_SCHOOL_BY_ID_REQUEST';
export const DELETE_SCHOOL_SUCCESS = 'DELETE_SCHOOL_SUCCESS';
export const DELETE_SCHOOL_FAILURE = 'DELETE_SCHOOL_FAILURE';

// Degree
export const FETCHING_DEGREE_REQUEST = 'FETCHING_DEGREE_REQUEST';
export const FETCHING_DEGREE_SUCCESS = 'FETCHING_DEGREE_SUCCESS';
export const FETCHING_DEGREE_FAILURE = 'FETCHING_DEGREE_FAILURE';

export const ADDING_DEGREE_REQUEST = 'ADDING_DEGREE_REQUEST';
export const ADDING_DEGREE_SUCCESS = 'ADDING_DEGREE_SUCCESS';
export const ADDING_DEGREE_FAILURE = 'ADDING_DEGREE_FAILURE';

export const UPDATING_DEGREE_REQUEST = 'UPDATING_DEGREE_REQUEST';
export const UPDATING_DEGREE_SUCCESS = 'UPDATING_DEGREE_SUCCESS';
export const UPDATING_DEGREE_FAILURE = 'UPDATING_DEGREE_FAILURE';

export const DELETE_DEGREE_BY_ID_REQUEST = 'DELETE_DEGREE_BY_ID_REQUEST';
export const DELETE_DEGREE_BY_SCHOOL_ID_REQUEST = 'DELETE_DEGREE_BY_SCHOOL_ID_REQUEST';
export const DELETE_DEGREE_SUCCESS = 'DELETE_DEGREE_SUCCESS';
export const DELETE_DEGREE_FAILURE = 'DELETE_DEGREE_FAILURE';

// Mark
export const FETCHING_MARK_REQUEST = 'FETCHING_MARK_REQUEST';
export const FETCHING_MARK_SUCCESS = 'FETCHING_MARK_SUCCESS';
export const FETCHING_MARK_FAILURE = 'FETCHING_MARK_FAILURE';

export const ADDING_MARK_REQUEST = 'ADDING_MARK_REQUEST';
export const ADDING_MARK_SUCCESS = 'ADDING_MARK_SUCCESS';
export const ADDING_MARK_FAILURE = 'ADDING_MARK_FAILURE';

export const UPDATING_MARK_REQUEST = 'UPDATING_MARK_REQUEST';
export const UPDATING_MARK_SUCCESS = 'UPDATING_MARK_SUCCESS';
export const UPDATING_MARK_FAILURE = 'UPDATING_MARK_FAILURE';

export const DELETE_MARK_BY_ID_REQUEST = 'DELETE_MARK_BY_ID_REQUEST';
export const DELETE_MARK_BY_DEGREE_ID_REQUEST = 'DELETE_MARK_BY_DEGREE_ID_REQUEST';
export const DELETE_MARK_BY_SCHOOL_ID_REQUEST = 'DELETE_MARK_BY_SCHOOL_ID_REQUEST';
export const DELETE_MARK_SUCCESS = 'DELETE_MARK_SUCCESS';
export const DELETE_MARK_FAILURE = 'DELETE_MARK_FAILURE';

// GET SCHOOL DATA FROM API - STARTS
function requestSchoolData() {
  return {
    type: FETCHING_SCHOOL_REQUEST,
    isFetching: true
  }
}

function receiveSchoolData(schools) {
  return {
    type: FETCHING_SCHOOL_SUCCESS,
    isFetching: false,
    schools
  }
}

function requestSchoolDataError(message) {
  return {
    type: FETCHING_SCHOOL_FAILURE,
    isFetching: false,
    message
  }
}

export function getSchools() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const username = decoded._doc.username;
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSchoolData())
    return axios.get(`http://localhost:8080/school/schools?username=${username}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(requestSchoolDataError(response.data.msg));
        }
        else{
          dispatch(receiveSchoolData(response.data.schools));
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// GET SCHOOL DATA FROM API - ENDS

// GET DEGREE DATA FROM API - STARTS
function requestDegreeData() {
  return {
    type: FETCHING_DEGREE_REQUEST,
    isFetching: true
  }
}

function receiveDegreeData(degrees) {
  return {
    type: FETCHING_DEGREE_SUCCESS,
    isFetching: false,
    degrees
  }
}

function requestDegreeDataError(message) {
  return {
    type: FETCHING_DEGREE_FAILURE,
    isFetching: false,
    message
  }
}

export function getDegrees() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const username = decoded._doc.username;
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestDegreeData())
    return axios.get(`http://localhost:8080/degree/degrees?username=${username}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(requestDegreeDataError(response.data.msg));
        }
        else{
          dispatch(receiveDegreeData(response.data.degrees));
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// GET DEGREE DATA FROM API - ENDS

// GET MARK DATA FROM API - STARTS
function requestMarkData() {
  return {
    type: FETCHING_MARK_REQUEST,
    isFetching: true
  }
}

function receiveMarkData(marks) {
  return {
    type: FETCHING_MARK_SUCCESS,
    isFetching: false,
    marks
  }
}

function requestMarkDataError(message) {
  return {
    type: FETCHING_MARK_FAILURE,
    isFetching: false,
    message
  }
}

export function getMarks() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const username = decoded._doc.username;
  let config = {
    method: 'GET',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestMarkData())

    return axios.get(`http://localhost:8080/mark/marks?username=${username}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(requestMarkDataError(response.data.msg));
        }
        else{
          dispatch(receiveMarkData(response.data.marks));
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// GET MARK DATA FROM API - ENDS

// ADD SCHOOL - STARTS
function requestAddSchool() {
  return {
    type: ADDING_SCHOOL_REQUEST,
    isFetching: true
  }
}

function addSchoolSuccess() {
  return {
    type: ADDING_SCHOOL_SUCCESS,
    isFetching: false
  }
}

function addSchoolError(message) {
  return {
    type: ADDING_SCHOOL_FAILURE,
    isFetching: false,
    message
  }
}

export function addSchool(school) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const data = Object.assign({}, school, {
    username: decoded._doc.username
  })
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestAddSchool())
    return axios.post(`http://localhost:8080/school/add`, data, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(addSchoolError(response.data.msg));
        }
        else{
          dispatch(addSchoolSuccess());
          // FETCHING DATA TO GET UP-TO-DATE SCHOOL DATA
          dispatch(getSchools());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// ADD SCHOOL - ENDS

// UPDATE SCHOOL - STARTS
function requestUpdateSchool() {
  return {
    type: UPDATING_SCHOOL_REQUEST,
    isFetching: true
  }
}

function updateSchoolSuccess() {
  return {
    type: UPDATING_SCHOOL_SUCCESS,
    isFetching: false
  }
}

function updateSchoolError(message) {
  return {
    type: UPDATING_SCHOOL_FAILURE,
    isFetching: false,
    message
  }
}

export function updateSchool(id, school) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'PUT',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestUpdateSchool())
    return axios.put(`http://localhost:8080/school/updateSchool/${id}`, school, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(updateSchoolError(response.data.msg));
        }
        else{
          dispatch(updateSchoolSuccess());
          // FETCHING DATA TO GET UP-TO-DATE SCHOOL DATA
          dispatch(getSchools());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// UPDATE SCHOOL - ENDS

// DELETE SCHOOL - STARTS
function requestDeleteSchoolById() {
  return {
    type: DELETE_SCHOOL_BY_ID_REQUEST,
    isFetching: true
  }
}

function requestDeleteSchoolBySchoolId() {
  return {
    type: DELETE_SCHOOL_BY_SCHOOL_ID_REQUEST,
    isFetching: true
  }
}

function deleteSchoolSuccess() {
  return {
    type: DELETE_SCHOOL_SUCCESS,
    isFetching: false
  }
}

function deleteSchoolError(message) {
  return {
    type: DELETE_SCHOOL_FAILURE,
    isFetching: false,
    message
  }
}

// BY SCHOOL ID
export function deleteSchoolById(id) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestDeleteSchoolById())
    return axios.delete(`http://localhost:8080/school/deleteSchool/${id}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(deleteSchoolError(response.data.msg));
        }
        else{
          dispatch(deleteSchoolSuccess());
          // FETCHING DATA TO GET UP-TO-DATE SCHOOL DATA
          dispatch(getSchools());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// DELETE SCHOOL - ENDS

// ADD DEGREE - STARTS
function requestAddDegree() {
  return {
    type: ADDING_DEGREE_REQUEST,
    isFetching: true
  }
}

function addDegreeSuccess() {
  return {
    type: ADDING_DEGREE_SUCCESS,
    isFetching: false
  }
}

function addDegreeError(message) {
  return {
    type: ADDING_DEGREE_FAILURE,
    isFetching: false,
    message
  }
}

export function addDegree(degree) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const data = Object.assign({}, degree, {
    username: decoded._doc.username
  })
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestAddDegree())
    return axios.post(`http://localhost:8080/degree/add`, data, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(addDegreeError(response.data.msg));
        }
        else{
          dispatch(addDegreeSuccess());
          // FETCHING DATA TO GET UP-TO-DATE DEGREE DATA
          dispatch(getDegrees());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// ADD DEGREE - ENDS

// UPDATE DEGREE - STARTS
function requestUpdateDegree() {
  return {
    type: UPDATING_DEGREE_REQUEST,
    isFetching: true
  }
}

function updateDegreeSuccess() {
  return {
    type: UPDATING_DEGREE_SUCCESS,
    isFetching: false
  }
}

function updateDegreeError(message) {
  return {
    type: UPDATING_DEGREE_FAILURE,
    isFetching: false,
    message
  }
}

export function updateDegree(id, degree) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'PUT',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestUpdateDegree())
    return axios.put(`http://localhost:8080/degree/updateDegree/${id}`, degree, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(updateDegreeError(response.data.msg));
        }
        else{
          dispatch(updateDegreeSuccess());
          // FETCHING DATA TO GET UP-TO-DATE DEGREE DATA
          dispatch(getDegrees());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// UPDATE DEGREE - ENDS

// DELETE DEGREE - STARTS
function requestDeleteDegreeById() {
  return {
    type: DELETE_DEGREE_BY_ID_REQUEST,
    isFetching: true
  }
}

function requestDeleteDegreeBySchoolId() {
  return {
    type: DELETE_DEGREE_BY_SCHOOL_ID_REQUEST,
    isFetching: true
  }
}

function deleteDegreeSuccess() {
  return {
    type: DELETE_DEGREE_SUCCESS,
    isFetching: false
  }
}

function deleteDegreeError(message) {
  return {
    type: DELETE_DEGREE_FAILURE,
    isFetching: false,
    message
  }
}

// BY DEGREE ID
export function deleteDegreeById(id) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestDeleteDegreeById())
    return axios.delete(`http://localhost:8080/degree/deleteDegree/${id}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(deleteDegreeError(response.data.msg));
        }
        else{
          dispatch(deleteDegreeSuccess());
          // FETCHING DATA TO GET UP-TO-DATE DEGREE DATA
          dispatch(getDegrees());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

// BY SCHOOL ID
export function deleteDegreeBySchoolId(school_id) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestDeleteDegreeBySchoolId())
    return axios.delete(`http://localhost:8080/degree/deleteDegree?school_id=${school_id}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(deleteDegreeError(response.data.msg));
        }
        else{
          dispatch(deleteDegreeSuccess());
          // FETCHING DATA TO GET UP-TO-DATE DEGREE DATA
          dispatch(getDegrees());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// DELETE DEGREE - ENDS

// ADD MARK - STARTS
function requestAddMark() {
  return {
    type: ADDING_MARK_REQUEST,
    isFetching: true
  }
}

function addMarkSuccess() {
  return {
    type: ADDING_MARK_SUCCESS,
    isFetching: false
  }
}

function addMarkError(message) {
  return {
    type: ADDING_MARK_FAILURE,
    isFetching: false,
    message
  }
}

export function addMark(mark) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const data = Object.assign({}, mark, {
    username: decoded._doc.username
  })
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestAddMark())
    return axios.post(`http://localhost:8080/mark/add`, data, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(addMarkError(response.data.msg));
        }
        else{
          dispatch(addMarkSuccess());
          // FETCHING DATA TO GET UP-TO-DATE MARK DATA
          dispatch(getMarks());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// ADD MARK - ENDS

// UPDATE MARK - STARTS
function requestUpdateMark() {
  return {
    type: UPDATING_MARK_REQUEST,
    isFetching: true
  }
}

function updateMarkSuccess() {
  return {
    type: UPDATING_MARK_SUCCESS,
    isFetching: false
  }
}

function updateMarkError(message) {
  return {
    type: UPDATING_MARK_FAILURE,
    isFetching: false,
    message
  }
}

export function updateMark(id, mark) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'PUT',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestUpdateMark())
    return axios.put(`http://localhost:8080/mark/updateMark/${id}`, mark, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(updateMarkError(response.data.msg));
        }
        else{
          dispatch(updateMarkSuccess());
          // FETCHING DATA TO GET UP-TO-DATE MARK DATA
          dispatch(getMarks());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// UPDATE MARK - ENDS

// DELETE MARK - STARTS
function requestDeleteMarkById() {
  return {
    type: DELETE_MARK_BY_ID_REQUEST,
    isFetching: true
  }
}

function requestDeleteMarkByDegreeId() {
  return {
    type: DELETE_MARK_BY_DEGREE_ID_REQUEST,
    isFetching: true
  }
}

function requestDeleteMarkBySchoolId() {
  return {
    type: DELETE_MARK_BY_SCHOOL_ID_REQUEST,
    isFetching: true
  }
}

function deleteMarkSuccess() {
  return {
    type: DELETE_MARK_SUCCESS,
    isFetching: false
  }
}

function deleteMarkError(message) {
  return {
    type: DELETE_MARK_FAILURE,
    isFetching: false,
    message
  }
}

// BY MARK ID
export function deleteMarkById(id) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestDeleteMarkById())
    return axios.delete(`http://localhost:8080/mark/deleteMark/${id}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(deleteMarkError(response.data.msg));
        }
        else{
          dispatch(deleteMarkSuccess());
          // FETCHING DATA TO GET UP-TO-DATE MARK DATA
          dispatch(getMarks());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

// BY DEGREE ID
export function deleteMarkByDegreeId(degree_id) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestDeleteMarkByDegreeId())
    return axios.delete(`http://localhost:8080/mark/deleteMark?degree_id=${degree_id}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(deleteMarkError(response.data.msg));
        }
        else{
          dispatch(deleteMarkSuccess());
          // FETCHING DATA TO GET UP-TO-DATE MARK DATA
          dispatch(getMarks());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

// BY SCHOOL ID
export function deleteMarkBySchoolId(school_id) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json', 'Authorization': token },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestDeleteMarkBySchoolId())
    return axios.delete(`http://localhost:8080/mark/deleteMark?school_id=${school_id}`, config)
      .then(response => {
        if(!response.data.success) {
          dispatch(deleteMarkError(response.data.msg));
        }
        else{
          dispatch(deleteMarkSuccess());
          // FETCHING DATA TO GET UP-TO-DATE MARK DATA
          dispatch(getMarks());
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
// DELETE MARK - ENDS
