export const TOGGLE_UPDATE_BIO = 'TOGGLE_UPDATE_BIO';
export const TOGGLE_DEFAULT = 'TOGGLE_DEFAULT';
export const TOGGLE_UPDATE_PASSWORD = 'TOGGLE_UPDATE_PASSWORD';

export const TOGGLE_SCHOOL_FORM = 'TOGGLE_SCHOOL_FORM';
export const TOGGLE_DEGREE_FORM = 'TOGGLE_DEGREE_FORM';
export const TOGGLE_MARK_FORM = 'TOGGLE_MARK_FORM';

export const TOGGLE_SCHOOL_DETAIL = 'TOGGLE_SCHOOL_DETAIL';
export const TOGGLE_DEGREE_DETAIL = 'TOGGLE_DEGREE_DETAIL';

export const TOGGLE_NO_UPDATE = 'TOGGLE_NO_UPDATE';
export const TOGGLE_SCHOOL_UPDATE = 'TOGGLE_SCHOOL_UPDATE';
export const TOGGLE_DEGREE_ADD = 'TOGGLE_DEGREE_ADD';
export const TOGGLE_DEGREE_UPDATE = 'TOGGLE_DEGREE_UPDATE';
export const TOGGLE_MARK_ADD = 'TOGGLE_MARK_ADD';
export const TOGGLE_MARK_UPDATE = 'TOGGLE_MARK_UPDATE';

export function toggleUpdateBio() {
  return {
    type: TOGGLE_UPDATE_BIO
  }
}

export function toggleUpdatePassword() {
  return {
    type: TOGGLE_UPDATE_PASSWORD
  }
}

export function toggleSchoolForm() {
  return {
    type: TOGGLE_SCHOOL_FORM
  }
}

export function toggleDegreeForm() {
  return {
    type: TOGGLE_DEGREE_FORM
  }
}

export function toggleMarkForm() {
  return {
    type: TOGGLE_MARK_FORM
  }
}

export function toggleSchoolDetail() {
  return {
    type: TOGGLE_SCHOOL_DETAIL
  }
}

export function toggleDegreeDetail() {
  return {
    type: TOGGLE_DEGREE_DETAIL
  }
}

export function toggleNoUpdate() {
  return {
    type: TOGGLE_NO_UPDATE,
  }
}

export function toggleShoolUpdate(school) {
  return {
    type: TOGGLE_SCHOOL_UPDATE,
    school
  }
}

export function toggleDegreeAdd(school_id) {
  return {
    type: TOGGLE_DEGREE_ADD,
    school_id
  }
}

export function toggleDegreeUpdate(degree) {
  return {
    type: TOGGLE_DEGREE_UPDATE,
    degree
  }
}

export function toggleMarkAdd(degree_id) {
  return {
    type: TOGGLE_MARK_ADD,
    degree_id
  }
}

export function toggleMarkUpdate(mark) {
  return {
    type: TOGGLE_MARK_UPDATE,
    mark
  }
}

export function toggleDefault() {
  //scroll the screen to top-left
  // window.scrollTo(0, 0);
  return {
    type: TOGGLE_DEFAULT
  }
}
