import { ActionTypes } from '../actions';

const initialState = {
  allEvents: [],
  event: {},
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_EVENTS:
      return Object.assign({}, state, { allEvents: action.payload });
    case ActionTypes.FETCH_EVENT:
      return Object.assign({}, state, { event: action.payload });
    case ActionTypes.ATTEND_EVENT:
      return Object.assign({}, state, { event: action.payload });
    case ActionTypes.LEAVE_EVENT:
      return Object.assign({}, state, { event: action.payload });
    default:
      return state;
  }
};

export default EventsReducer;
