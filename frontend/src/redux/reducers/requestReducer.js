import {
  FETCH_REQUEST_EACH_RECIPIENT_SUCCESS,
  FETCH_REQUEST_SUCCESS,
  MOVE_REQUEST_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  listRequests: [],
  listRequestsOfEachRecipients: [],
  requestUpdate: null,
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REQUEST_SUCCESS:
      return {
        ...state,
        listRequests: action.payload,
      };
    case FETCH_REQUEST_EACH_RECIPIENT_SUCCESS:
      return {
        ...state,
        listRequestsOfEachRecipients: action.payload,
      };
    case MOVE_REQUEST_SUCCESS: {
      return {
        ...state,
        requestUpdate: action.payload,
      }
    }
    default:
      return state;
  }
};
export default requestReducer;
