import {
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_EACH_RECIPIENT_SUCCESS,
  MOVE_REQUEST_SUCCESS,
  FETCH_NOTIFY_FOR_RECIPIENT_SUCCESS,
  FETCH_NOTIFY_FOR_DONOR_SUCCESS,
} from './types';
import axios from 'axios';
import { DOMAIN_BACKEND } from '../../config/settingSystem';
export const getNotifyForRecipient = (recipientId) => {
  return async (dispatch) => {
      try {
        const resNotify = await axios.get(`${DOMAIN_BACKEND}/api/get-notify-by-recipient-id?recipientId=${recipientId}`)
          const data = resNotify && resNotify.data ? resNotify.data : [];
          dispatch(fetchNotifyForRecipientSuccess(data.content));
      } catch (error) {
          console.log(error);
      }
  };
};
export const getNotifyForDonor = (donorId) => {
  return async (dispatch) => {
      try {
        const resNotify = await axios.get(`${DOMAIN_BACKEND}/api/get-notify-by-donor-id?donorId=${donorId}`)
          const data = resNotify && resNotify.data ? resNotify.data : [];
          dispatch(fetchNotifyForDonorSuccess(data.content));
      } catch (error) {
          console.log(error);
      }
  };
};
export const fetchNotifyForRecipientSuccess = (payload) => {
  return {
      type: FETCH_NOTIFY_FOR_RECIPIENT_SUCCESS,
      payload,
  };
};
export const fetchNotifyForDonorSuccess = (payload) => {
  return {
      type: FETCH_NOTIFY_FOR_DONOR_SUCCESS,
      payload,
  };
};


