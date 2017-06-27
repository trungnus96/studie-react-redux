import { TOGGLE_NO_UPDATE, TOGGLE_SCHOOL_UPDATE,
  TOGGLE_DEGREE_ADD, TOGGLE_DEGREE_UPDATE,
  TOGGLE_MARK_ADD, TOGGLE_MARK_UPDATE } from '../actions/Toggle.jsx';

const initial_state = {
  school: {},
  degree: {},
  mark: {}
}

export default function(state = {}, action) {

  switch(action.type) {
    case TOGGLE_SCHOOL_UPDATE:
      return {
        school: action.school,
        degree: {},
        mark: {}
      }

    case TOGGLE_DEGREE_ADD:
      return {
        school: {},
        degree: { school_id: action.school_id },
        mark: {}
      }

    case TOGGLE_DEGREE_UPDATE:
      return {
        school: {},
        degree: action.degree,
        mark: {}
      }

    case TOGGLE_MARK_ADD:
      return {
        school: {},
        degree: {},
        mark: { degree_id: action.degree_id }
      }

    case TOGGLE_MARK_UPDATE:
      return {
        school: {},
        degree: {},
        mark: action.mark
      }

    case TOGGLE_NO_UPDATE:
      return initial_state;
  }
  return state;
}
