import { ActionTypes } from '../actions';

const initialState = {
  currentUser: {},
  user: {},
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.payload });
    case ActionTypes.FETCH_USER:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
};

export default UsersReducer;
