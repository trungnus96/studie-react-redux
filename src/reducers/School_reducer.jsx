import {
  FETCHING_SCHOOL_REQUEST,
  FETCHING_SCHOOL_SUCCESS,
  FETCHING_SCHOOL_FAILURE,
  ADDING_SCHOOL_REQUEST,
  ADDING_SCHOOL_SUCCESS,
  ADDING_SCHOOL_FAILURE,
  UPDATING_SCHOOL_REQUEST,
  UPDATING_SCHOOL_SUCCESS,
  UPDATING_SCHOOL_FAILURE,
  DELETE_SCHOOL_BY_ID_REQUEST,
  DELETE_SCHOOL_SUCCESS,
  DELETE_SCHOOL_FAILURE
} from '../actions/Academic.jsx';

const initial_state = {
  schools: [],
  isFetching: true
}

export default function(state = initial_state, action) {

  switch (action.type) {
    case FETCHING_SCHOOL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        message: 'Fetching school data...'
      })

    case FETCHING_SCHOOL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        schools: action.schools,
        message: 'Fetching school data - SUCCESS'
      })

    case FETCHING_SCHOOL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

      // ADDING SCHOOL
    case ADDING_SCHOOL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Adding school ...'
      })

    case ADDING_SCHOOL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        schools: action.schools,
        messageOnStudie: 'Added school - SUCCESS'
      })

    case ADDING_SCHOOL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })

      // UPDATING SCHOOL
    case UPDATING_SCHOOL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Updating school ...'
      })

    case UPDATING_SCHOOL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: 'Updated school - SUCCESS'
      })

    case UPDATING_SCHOOL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })

      // DELETING SCHOOL
    case DELETE_SCHOOL_BY_ID_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Deleting school ...'
      })

    case DELETE_SCHOOL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: 'Deleted school - SUCCESS'
      })

    case DELETE_SCHOOL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })
  }
  return state;
}
