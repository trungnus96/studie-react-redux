import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Auth from './Auth_reducer.jsx';
import User from './User_reducer.jsx';
import Schools from './School_reducer.jsx';
import Degrees from './Degree_reducer.jsx';
import Marks from './Mark_reducer.jsx';
import Toggle from './Toggle_reducer.jsx';
import UpdateItem from './Update_Item_reducer.jsx';

// const rootReducer = combineReducers({
//   auth: Auth,
//   user: User,
//   schools: Schools,
//   degrees: Degrees,
//   marks: Marks,
//   form: formReducer,
//   toggle: Toggle
// });
const appReducer = combineReducers({
  auth: Auth,
  user: User,
  schools: Schools,
  degrees: Degrees,
  marks: Marks,
  form: formReducer,
  toggle: Toggle,
  updatedItem: UpdateItem
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
export default rootReducer;
