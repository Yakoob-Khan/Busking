import { ActionTypes } from '../actions';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: '',
};
// AUTH_USER: authenticated: true
// DEAUTH_USER_SUCCESS: authenticated: false
// AUTH_ERROR: authenticated: false

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER_SUCCESS:
      return Object.assign({}, state, { isAuthenticated: true, user: action.payload.user, token: action.payload.token });
    case ActionTypes.DEAUTH_USER_SUCCESS:
      return Object.assign({}, state, { authenticated: false, user: null, token: '' });
    // case ActionTypes.AUTH_ERROR:
    //   return Object.assign({}, state, { authenticated: false, current_user: undefined, made_error: true });
    // case ActionTypes.AUTH_ERROR_UPDATE_POST_TOGGLE:
    //   return Object.assign({}, state, { auth_error_update_post: !state.auth_error_update_post });
    default:
      return state;
  }
};

export default AuthReducer;
