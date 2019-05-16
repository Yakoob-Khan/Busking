import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  FETCH_EVENTS: 'FETCH_EVENTS',
  CREATE_EVENT: 'CREATE_EVENT',
  FETCH_EVENT: 'FETCH_EVENT',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',
  ERROR: 'ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

const ROOT_URL = 'http://localhost:9090/api';

export function appError(message) {
  return {
    type: ActionTypes.ERROR,
    message,
  };
}

export function clearError() {
  return {
    type: ActionTypes.CLEAR_ERROR,
  };
}

export function fetchEvents() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events`)
      .then((response) => {
        dispatch({
          type: ActionTypes.FETCH_EVENTS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(appError(`Error retrieving events :( ${error.response.data}`));
        console.log(error);
      });
  };
}

export function createEvent(newEvent, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/events`, newEvent)
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch(appError(`Error creating post :( ${error.response.data}`));
        console.log(error);
      });
  };
}

export function fetchEvent(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events/${id}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.FETCH_EVENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(appError(`Error retrieving event :( ${error.response.data}`));
      });
  };
}

export function updateEvent(update) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/events/${update.id}`, update)
      .then((response) => {
        dispatch(fetchEvent(update.id));
      })
      .catch((error) => {
        dispatch(appError(`Error updating post :( ${error.response.data}`));
      });
  };
}

export function deleteEvent(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/events/${id}`)
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch(appError(`Error deleting post :( ${error.response.data}`));
      });
  };
}

export function rateEvent(id, rating) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/events/rate/${id}`, { rating })
      .then((response) => {
        dispatch(fetchEvent(id));
      })
      .catch((error) => {
        dispatch(appError(`Error rating post :( ${error.response.data}`));
      });
  };
}

export function updateCurrentUser(updatedUser) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/user`, updatedUser)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_CURRENT_USER, payload: response.data });
      })
      .catch((error) => {
        dispatch(appError(`Update user failed: ${error.response.data}`));
      });
  };
}
