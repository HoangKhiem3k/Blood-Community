import {
  FETCH_NOTIFY_FOR_DONOR_SUCCESS,
  FETCH_NOTIFY_FOR_RECIPIENT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  listNotifyOfRecipient: [],
  listNotifyOfDonor: [],
};

const notifyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTIFY_FOR_RECIPIENT_SUCCESS:
      return {
        ...state,
        listNotifyOfRecipient: action.payload,
      };
      case FETCH_NOTIFY_FOR_DONOR_SUCCESS:
      return {
        ...state,
        listNotifyOfDonor: action.payload,
      };
    
    default:
      return state;
  }
};
export default notifyReducer;
