import { combineReducers } from 'redux';

import EventsReducer from './eventsReducer';
import UsersReducer from './usersReducer';

const rootReducer = combineReducers({
  events: EventsReducer,
  users: UsersReducer,
});

export default rootReducer;
