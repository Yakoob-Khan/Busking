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
  GET_USER_LOCATION: 'GET_USER_LOCATION',
  FETCH_USER: 'FETCH_USER',
  FOLLOW_USER: 'FOLLOW_USER',
  UNFOLLOW_USER: 'UNFOLLOW_USER',
  ATTEND_EVENT: 'ATTEND_EVENT',
  LEAVE_EVENT: 'LEAVE_EVENT',
  UPDATE_STRIPE_ID: 'UPDATE_STRIPE_ID',
};

const ROOT_URL = 'http://localhost:9090/api';

export const testAPI = () => {
  return () => {
    axios.get('http://localhost:9090/', { headers: { authorization: localStorage.getItem('jwtToken') } }).then((r) => {
      console.log(r);
    // dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
    }).catch((e) => {
      console.log(e);
    });
  };
};


export const facebookResponseLocal = (localToken) => {
  return (dispatch) => {
    axios.get('http://localhost:9090/auth/facebook/refresh', { headers: { authorization: localToken } }).then((r) => {
      const user = r.data;
      if (r.status === 200) {
        dispatch({
          type: ActionTypes.AUTH_USER_SUCCESS,
          payload: { user },
        });
        // this.setState({ isAuthenticated: true, user, token });
      } else {
        dispatch({ type: ActionTypes.ERROR });
      }
    // dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
    }).catch((e) => {
      console.log(e);
    });
  };
};


export function logoutUser(history) {
  return (dispatch) => {
    history.push('/');
    localStorage.removeItem('jwtToken');
    dispatch({
      type: ActionTypes.DEAUTH_USER_SUCCESS,
    });
  };
}

export const facebookResponse = (response) => {
  return (dispatch) => {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    };
    fetch('http://localhost:9090/auth/facebook', options).then((r) => {
      const token = r.headers.get('x-auth-token');
      localStorage.setItem('jwtToken', token);
      r.json().then((user) => {
        if (token) {
          dispatch({
            type: ActionTypes.AUTH_USER_SUCCESS,
            payload: { user, token },
          });
          dispatch({ type: ActionTypes.UPDATE_CURRENT_USER, payload: { user } });
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

export const searchEvents = (searchTerm) => {
  return (dispatch) => {
    if (searchTerm === '') {
      dispatch(fetchEvents());
    } else {
      axios.put('http://localhost:9090/api/search/event', { searchTerm }).then((r) => {
        dispatch(
          {
            type: ActionTypes.FETCH_EVENTS,
            payload: r.data,
          },
        );
      // dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
      }).catch((e) => {
        dispatch(appError(`Error retrieving events :( ${e}`));
      });
    }
  };
};

// update store events after sorting based on user location
export function updateStateEvents(events) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.FETCH_EVENTS,
      payload: events,
    });
  };
}

export function createEvent(newEvent, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/events`, newEvent, { headers: { authorization: localStorage.getItem('jwtToken') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch(appError(`Error creating post :( ${error}`));
        console.log(error);
      });
  };
}

export function fetchEvent(id, callback) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events/${id}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.FETCH_EVENT,
          payload: response.data,
        });
        callback();
      })
      .catch((error) => {
        dispatch(appError(`Error retrieving event :( ${error}`));
      });
  };
}

export const writeComment = (id, text, history) => {
  return (dispatch) => {
    console.log('helo api comment!');
    axios.post(`http://localhost:9090/api/comment/${id}`, { text }, { headers: { authorization: localStorage.getItem('jwtToken') } }).then((r) => {
      // console.log(r);
      dispatch(fetchEvent(id));
      history.push(`/events/${id}`);
    // dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
    }).catch((e) => {
      console.log(e);
    });
  };
};

export function updateEvent(update) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/events/${update.id}`, update)
      .then((response) => {
        dispatch(fetchEvent(update.id));
      })
      .catch((error) => {
        dispatch(appError(`Error updating post :( ${error}`));
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
        dispatch(appError(`Error deleting post :( ${error}`));
      });
  };
}

export function attendEvent(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events/attend/${id}`, { headers: { authorization: localStorage.getItem('jwtToken') } })
      .then((response) => {
        dispatch({
          type: ActionTypes.ATTEND_EVENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(appError(`Error attending event :( ${error}`));
      });
  };
}

export function leaveEvent(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/events/leave/${id}`, { headers: { authorization: localStorage.getItem('jwtToken') } })
      .then((response) => {
        dispatch({
          type: ActionTypes.LEAVE_EVENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(appError(`Error attending event :( ${error}`));
      });
  };
}

export function rateEvent(id, rating, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/events/rate/${id}`, { rating })
      .then((response) => {
        dispatch(fetchEvent(id));
        history.push(`/events/${id}`);
      })
      .catch((error) => {
        dispatch(appError(`Error rating post :( ${error}`));
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
        dispatch(appError(`Update user failed: ${error}`));
      });
  };
}

export function updateStripeId(updatedUser) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/userStripeId`, updatedUser)
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_STRIPE_ID, payload: response.data });
      })
      .catch((error) => {
        dispatch(appError(`Update user failed: ${error}`));
      });
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${id}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.FETCH_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(appError(`Error retrieving user :( ${error}`));
      });
  };
}

export function followUser(followId) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/follow/${followId}`, { headers: { authorization: localStorage.getItem('jwtToken') } })
      .then((response) => {
        dispatch({
          type: ActionTypes.FOLLOW_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(appError(`Error following user :( ${error}`));
      });
  };
}

export function unFollowUser(unfollowId) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/unfollow/${unfollowId}`, { headers: { authorization: localStorage.getItem('jwtToken') } })
      .then((response) => {
        dispatch({
          type: ActionTypes.UNFOLLOW_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(appError(`Error unfollowing user :( ${error}`));
      });
  };
}

export function getCurrentLocation() {
  return (dispatch) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
          type: ActionTypes.GET_USER_LOCATION,
          payload: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    } else {
      // Browser doesn't support Geolocation
      console.log('your browswer does not support this 2019 shit');
      dispatch(appError('your browswer does not support this 2019 shit'));
    }
  };
}
