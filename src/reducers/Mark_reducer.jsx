import { FETCHING_MARK_REQUEST, FETCHING_MARK_SUCCESS, FETCHING_MARK_FAILURE,
ADDING_MARK_REQUEST, ADDING_MARK_SUCCESS, ADDING_MARK_FAILURE,
UPDATING_MARK_REQUEST, UPDATING_MARK_SUCCESS, UPDATING_MARK_FAILURE,
DELETE_MARK_BY_ID_REQUEST, DELETE_MARK_BY_DEGREE_ID_REQUEST, DELETE_MARK_BY_SCHOOL_ID_REQUEST,
DELETE_MARK_SUCCESS, DELETE_MARK_FAILURE } from '../actions/Academic.jsx';

const initial_state = {
  marks: [],
  isFetching: true
}

export default function(state = initial_state, action) {

  switch(action.type) {
    case FETCHING_MARK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        message: 'Fetching mark data...'
    })

    case FETCHING_MARK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        marks: action.marks,
        message: 'Fetching mark data - SUCCESS'
      })

    case FETCHING_MARK_FAILURE:
      return Object.assign({}, state, {
       isFetching: false,
       errorMessage: action.message
     })

     // ADDING MARK
     case ADDING_MARK_REQUEST:
       return Object.assign({}, state, {
         isFetching: true,
         messageOnStudie: 'Adding mark ...'
     })

     case ADDING_MARK_SUCCESS:
       return Object.assign({}, state, {
         isFetching: false,
         schools: action.schools,
         messageOnStudie: 'Added mark - SUCCESS'
       })

     case ADDING_MARK_FAILURE:
       return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })

      // UPDATING MARK
    case UPDATING_MARK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Updating mark ...'
      })

    case UPDATING_MARK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: 'Updated mark - SUCCESS'
      })

    case UPDATING_MARK_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })

      // DELETING MARK
    case DELETE_MARK_BY_ID_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Deleting mark M...'
      })

    case DELETE_MARK_BY_DEGREE_ID_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Deleting marks D...'
      })

    case DELETE_MARK_BY_SCHOOL_ID_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        messageOnStudie: 'Deleting mark S...'
      })

    case DELETE_MARK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: 'Deleted mark - SUCCESS'
      })

    case DELETE_MARK_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messageOnStudie: action.message
      })
  }
  return state;
}
