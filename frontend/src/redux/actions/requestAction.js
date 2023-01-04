import {
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_EACH_RECIPIENT_SUCCESS,
  MOVE_REQUEST_SUCCESS,
} from './types';
import axios from 'axios';
import { DOMAIN_BACKEND } from '../../config/settingSystem';
export const moveDataUpdateToRedux = (payload) => {
  return {
      type: MOVE_REQUEST_SUCCESS,
      payload,
  };
};

export const fetchRequest = (groupBlood) => {
  return async (dispatch) => {
      try {
          const res = await axios.get(`${DOMAIN_BACKEND}/api/get-all-request-by-group-blood?groupBlood=${groupBlood}`);
          const data = res && res.data ? res.data : [];
          dispatch(fetchRequestSuccess(data.content));
      } catch (error) {
          console.log(error);
      }
  };
};
export const fetchRequestSuccess = (payload) => {
  return {
      type: FETCH_REQUEST_SUCCESS,
      payload,
  };
};

export const fetchRecipientRequest = (id) => {
  return async (dispatch) => {
      try {
          const res = await axios.get(`${DOMAIN_BACKEND}/api/get-all-request-by-recipient-id?id=${id}`);
          const data = res && res.data ? res.data : [];
          dispatch(fetchRequestOfEachRecipientSuccess(data.content));
      } catch (error) {
          console.log(error);
      }
  };
};

export const fetchRequestOfEachRecipientSuccess = (payload) => {
  return {
      type: FETCH_REQUEST_EACH_RECIPIENT_SUCCESS,
      payload,
  };
};

