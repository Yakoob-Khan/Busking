import { combineReducers } from 'redux';

import EventsReducer from './eventsReducer';
import UsersReducer from './usersReducer';
import AuthReducer from './authReducer';

const rootReducer = combineReducers({
  events: EventsReducer,
  users: UsersReducer,
  auth: AuthReducer,
});

export default rootReducer;
