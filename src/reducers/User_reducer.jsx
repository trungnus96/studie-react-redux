import { FETCHING_USER_REQUEST, FETCHING_USER_SUCCESS, FETCHING_USER_FAILURE,
UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE } from '../actions/User.jsx';

export default function(state = {}, action) {

  switch(action.type) {
    case FETCHING_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        message: 'Fetching user data...'
    })

    case FETCHING_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
        message: 'Fetched user data - SUCCESS'
      })

    case FETCHING_USER_FAILURE:
      return Object.assign({}, state, {
       isFetching: false,
       message: action.message
     })

     // UPDATE PROFILE
     case UPDATE_USER_REQUEST:
       return Object.assign({}, state, {
         isFetching: true,
         message: 'Updating user data...'
     })

     case UPDATE_USER_SUCCESS:
       return Object.assign({}, state, {
         isFetching: false,
         user: Object.assign({}, state.user, {
           name: action.updated_data.name,
           dob: action.updated_data.dob,
           phone: action.updated_data.phone,
           email: action.updated_data.email
         }),
         message: 'Updated user data - SUCCESS'
       })

     case UPDATE_USER_FAILURE:
       return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })

      // UPDATE PASSWORD
      case UPDATE_PASSWORD_REQUEST:
        return Object.assign({}, state, {
         isFetching: true,
         message: 'Updating password...'
       })

      case UPDATE_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          message: 'Updated password - SUCCESS'
        })

      case UPDATE_PASSWORD_FAILURE:
        return Object.assign({}, state, {
         isFetching: false,
         message: action.message
       })
  }
  return state;
}
