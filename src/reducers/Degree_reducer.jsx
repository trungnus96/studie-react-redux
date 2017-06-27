import {
  FETCHING_DEGREE_REQUEST,
  FETCHING_DEGREE_SUCCESS,
  FETCHING_DEGREE_FAILURE,
  ADDING_DEGREE_REQUEST,
  ADDING_DEGREE_SUCCESS,
  ADDING_DEGREE_FAILURE,
  UPDATING_DEGREE_REQUEST,
  UPDATING_DEGREE_SUCCESS,
  UPDATING_DEGREE_FAILURE,
  DELETE_DEGREE_BY_ID_REQUEST,
  DELETE_DEGREE_BY_SCHOOL_ID_REQUEST,
  DELETE_DEGREE_SUCCESS,
  DELETE_DEGREE_FAILURE
} from '../actions/Academic.jsx';

const initial_state = {
  degrees: [],
  isFetching: true
}

export default function(state = initial_state, action) {

  switch (action.type) {
    case FETCHING_DEGREE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        message: 'Fetching degree data...'
      })

    case FETCHING_DEGREE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        degrees: action.degrees,
        message: 'Fetching degree data - SUCCESS'
      })

    case FETCHING_DEGREE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })

      // ADDING DEGREE
    case ADDING_DEGREE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Adding degree ...'
      })

    case ADDING_DEGREE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        schools: action.schools,
        messageOnStudie: 'Added degree - SUCCESS'
      })

    case ADDING_DEGREE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })

      // UPDATING DEGREE
    case UPDATING_DEGREE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Updating degree ...'
      })

    case UPDATING_DEGREE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: 'Updated degree - SUCCESS'
      })

    case UPDATING_DEGREE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })

      // DELETING DEGREE
    case DELETE_DEGREE_BY_ID_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Deleting degree M...'
      })

    case DELETE_DEGREE_BY_SCHOOL_ID_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Deleting degree S...'
      })

    case DELETE_DEGREE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: 'Deleted degree - SUCCESS'
      })

    case DELETE_DEGREE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })
  }
  return state;
}
