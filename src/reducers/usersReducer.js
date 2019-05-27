import { ActionTypes } from '../actions';

const initialState = {
  currentUser: {},
  user: {},
  currentUserLocation: {},
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.payload });
    case ActionTypes.FETCH_USER:
      return Object.assign({}, state, { user: action.payload });
    case ActionTypes.GET_USER_LOCATION:
      return Object.assign({}, state, { currentUserLocation: action.payload });
    case ActionTypes.FOLLOW_USER:
      return Object.assign({}, state, { user: action.payload });
    case ActionTypes.UNFOLLOW_USER:
      return Object.assign({}, state, { user: action.payload });
    case ActionTypes.UPDATE_STRIPE_ID:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
};

export default UsersReducer;
