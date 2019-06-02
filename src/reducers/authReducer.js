import { ActionTypes } from '../actions';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER_SUCCESS:
      return Object.assign({}, state, { isAuthenticated: true, user: action.payload.user });
    case ActionTypes.DEAUTH_USER_SUCCESS:
      return Object.assign({}, state, { isAuthenticated: false, user: null, token: '' });
    default:
      return state;
  }
};

export default AuthReducer;
