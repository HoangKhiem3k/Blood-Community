import axios from 'axios';
import { DOMAIN_BACKEND } from '../../config/settingSystem';
// import axios from '../../utils/customizeAxios';

import {
    FETCH_RECIPIENT_ERROR,
    FETCH_RECIPIENT_REQUEST,
    FETCH_RECIPIENT_SUCCESS,
    FETCH_SINGLE_RECIPIENT_SUCCESS,
    FETCH_SINGLE_RECIPIENT_ERROR,
    FETCH_SINGLE_RECIPIENT_REQUEST,
    UPDATE_RECIPIENT_REQUEST,
    UPDATE_RECIPIENT_SUCCESS,
    UPDATE_RECIPIENT_ERROR,
} from './types';

// fetch all recipient
export const fetchAllRecipient = () => {
    return async (dispatch, getState) => {
        dispatch(fetchRecipientRequest());
        try {
            const res = await axios.get(`${DOMAIN_BACKEND}/api/get-user-by-type`, { params: { type: 'R4' } });
            const data = res && res.data ? res.data : [];
            dispatch(fetchRecipientSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchRecipientError(error));
        }
    };
};

export const fetchRecipientRequest = () => {
    return {
        type: FETCH_RECIPIENT_REQUEST,
    };
};

export const fetchRecipientSuccess = (payload) => {
    return {
        type: FETCH_RECIPIENT_SUCCESS,
        payload,
    };
};

export const fetchRecipientError = () => {
    return {
        type: FETCH_RECIPIENT_ERROR,
    };
};

// get recipient by id
export const fetchRecipientById = (id) => {
    return async (dispatch, getState) => {
        dispatch(fetchRecipientByIdRequest());
        try {
            const res = await axios.get(`${DOMAIN_BACKEND}/api/get-user-by-id`, { params: { id: id } });
            const data = res && res.data ? res.data : [];
            dispatch(fetchRecipientByIdSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchRecipientByIdError());
        }
    };
};

export const fetchRecipientByIdRequest = () => {
    return {
        type: FETCH_SINGLE_RECIPIENT_REQUEST,
    };
};

export const fetchRecipientByIdSuccess = (payload) => {
    return {
        type: FETCH_SINGLE_RECIPIENT_SUCCESS,
        payload,
    };
};

export const fetchRecipientByIdError = () => {
    return {
        type: FETCH_SINGLE_RECIPIENT_ERROR,
    };
};

// update Recipient
export const updateRecipient = (recipient) => {
    return async (dispatch, getState) => {
        dispatch(updateRecipientRequest());
        try {
            const res = await axios.put(`${DOMAIN_BACKEND}/api/update-user`, recipient);
            const data = res && res.data ? res.data : [];
            dispatch(updateRecipientSuccess(data));
            dispatch(fetchAllRecipient());
        } catch (error) {
            console.log(error);
            dispatch(updateRecipientError());
        }
    };
};

export const updateRecipientRequest = () => {
    return {
        type: UPDATE_RECIPIENT_REQUEST,
    };
};

export const updateRecipientSuccess = (payload) => {
    return {
        type: UPDATE_RECIPIENT_SUCCESS,
        payload,
    };
};

export const updateRecipientError = () => {
    return {
        type: UPDATE_RECIPIENT_ERROR,
    };
};
