import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  FETCH_EVENTS: 'FETCH_EVENTS',
  CREATE_EVENT: 'CREATE_EVENT',
  FETCH_EVENT: 'FETCH_EVENT',
  AUTH_USER_SUCCESS: 'AUTH_USER_SUCCESS',
  DEAUTH_USER_SUCCESS: 'DEAUTH_USER_SUCCESS',
  UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',
  ERROR: 'ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

const ROOT_URL = 'http://localhost:9090/api';

// export const testAPI = () => {
//   return (dispatch) => {
//     fetch('http://localhost:9090/auth/sessionTest').then((r) => {
//       console.log(r);
//     });
//   };
// };

export const testAPI = () => {
  return () => {
    axios.get('http://localhost:9090/', { headers: { 'X-AUTHENTICATION': localStorage.getItem('token') } }).then((r) => {
      console.log(r);
    // dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
    }).catch((e) => {
      console.log(e);
    });
  };
};


export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
      type: ActionTypes.DEAUTH_USER_SUCCESS,
    });
  };
};

export const facebookResponseLocal = (localToken) => {
  return (dispatch) => {
    console.log('called!');
    const tokenBlob = new Blob([JSON.stringify({ access_token: localToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    };
    fetch('http://localhost:9090/auth/facebook', options).then((r) => {
      const token = r.headers.get('x-auth-token');
      r.json().then((user) => {
        if (token) {
          // localStorage.setItem('token', token);
          // console.log(localStorage.getItem('token'));
          dispatch({
            type: ActionTypes.AUTH_USER_SUCCESS,
            payload: { user, token },
          });
          // this.setState({ isAuthenticated: true, user, token });
        }
      });
    });
  };
};

export const facebookResponse = (response) => {
  console.log(response);
  return (dispatch) => {
    console.log(response.accessToken);
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    localStorage.setItem('token', response.accessToken);
    console.log(localStorage.getItem('token'));
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    };
    fetch('http://localhost:9090/auth/facebook', options).then((r) => {
      const token = r.headers.get('x-auth-token');
      console.log(r);
      r.json().then((user) => {
        if (token) {
          dispatch({
            type: ActionTypes.AUTH_USER_SUCCESS,
            payload: { user, token },
          });
          // this.setState({ isAuthenticated: true, user, token });
        } else {
          dispatch({ type: ActionTypes.ERROR });
        }
      });
    });
  };
};


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
        dispatch(appError(`Error retrieving events :( ${error}`));
        console.log(error);
      });
  };
}

export function createEvent(newEvent, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/events`, newEvent)
      .then((response) => {
        history.push('/events');
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
