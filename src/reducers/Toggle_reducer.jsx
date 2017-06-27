import { TOGGLE_UPDATE_BIO, TOGGLE_DEFAULT, TOGGLE_UPDATE_PASSWORD,
  TOGGLE_SCHOOL_FORM, TOGGLE_DEGREE_FORM, TOGGLE_MARK_FORM,
  TOGGLE_SCHOOL_DETAIL, TOGGLE_DEGREE_DETAIL, TOGGLE_DEFAULT_FROM_MARK } from '../actions/Toggle.jsx';

const initial_state = {
  isUpdateBio: false,
  isUpdatePassword: false,
  isStudie: true,
  isSchoolForm: false,
  isDegreeForm: false,
  isMarkForm: false,
  isSchoolDetail: true,
  isDegreeDetail: false
}

export default function(state = initial_state, action) {

  switch(action.type) {
    case TOGGLE_UPDATE_BIO:
      return Object.assign({}, state, {
        isUpdateBio: true,
        isUpdatePassword: false,
        isStudie: false,
        isSchoolForm: false,
        isDegreeForm: false,
        isMarkForm: false,
        isSchoolDetail: true,
        isDegreeDetail: false
    })

    case TOGGLE_UPDATE_PASSWORD:
      return Object.assign({}, state, {
        isUpdateBio: false,
        isUpdatePassword: true,
        isStudie: false,
        isSchoolForm: false,
        isDegreeForm: false,
        isMarkForm: false,
        isSchoolDetail: true,
        isDegreeDetail: false
    })

    case TOGGLE_SCHOOL_FORM:
      return Object.assign({}, state, {
        isUpdateBio: false,
        isUpdatePassword: false,
        isStudie: true,
        isSchoolForm: true,
        isDegreeForm: false,
        isMarkForm: false,
        isSchoolDetail: false,
        isDegreeDetail: false
    })

    case TOGGLE_DEGREE_FORM:
      return Object.assign({}, state, {
        isUpdateBio: false,
        isUpdatePassword: false,
        isStudie: true,
        isSchoolForm: false,
        isDegreeForm: true,
        isMarkForm: false,
        isSchoolDetail: false,
        isDegreeDetail: false
    })

    case TOGGLE_MARK_FORM:
      return Object.assign({}, state, {
        isUpdateBio: false,
        isUpdatePassword: false,
        isStudie: true,
        isSchoolForm: false,
        isDegreeForm: false,
        isMarkForm: true,
        isSchoolDetail: false,
        isDegreeDetail: false
    })

    case TOGGLE_SCHOOL_DETAIL:
      return Object.assign({}, state, {
        isUpdateBio: false,
        isUpdatePassword: false,
        isStudie: true,
        isSchoolForm: false,
        isDegreeForm: false,
        isMarkForm: false,
        isSchoolDetail: true,
        isDegreeDetail: false
    })

    case TOGGLE_DEGREE_DETAIL:
      return Object.assign({}, state, {
        isUpdateBio: false,
        isUpdatePassword: false,
        isStudie: true,
        isSchoolForm: false,
        isDegreeForm: false,
        isMarkForm: false,
        isSchoolDetail: false,
        isDegreeDetail: true
    })

    case TOGGLE_DEFAULT:
      return Object.assign({}, state, {
        isUpdateBio: false,
        isUpdatePassword: false,
        isStudie: true,
        isSchoolForm: false,
        isDegreeForm: false,
        isMarkForm: false,
        isSchoolDetail: true,
        isDegreeDetail: false
    })
  }
  return state;
}
