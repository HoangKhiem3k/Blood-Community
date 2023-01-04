import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
} from './types';
import axios from 'axios';
import { DOMAIN_BACKEND } from '../../config/settingSystem';

export const registerAccount = (user) => {
    return async (dispatch, getState) => {
        dispatch(registerAccountRequest());
        try {
            const res = await axios.post(`${DOMAIN_BACKEND}/api/create-new-user`, user);
            const data = res && res.data ? res.data : [];
            dispatch(registerAccountSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(registerAccountError(error));
        }
    };
};

export const registerAccountRequest = () => {
    return {
        type: REGISTER_REQUEST,
    };
};

export const registerAccountSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload,
    };
};

export const registerAccountError = (error) => {
    return {
        type: REGISTER_ERROR,
        payload: {
            error,
        },
    };
};

export const loginAccount = (user) => {
    return async (dispatch, getState) => {
        dispatch(loginAccountRequest());
        try {
            const res = await axios.post(`${DOMAIN_BACKEND}/api/login`, user);
            const data = res && res.data ? res.data : [];
            if (data && data.content) {
                localStorage.setItem('user', JSON.stringify(data.content));
            }
            dispatch(loginAccountSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(loginAccountError(error));
        }
    };
};

export const loginAccountRequest = () => {
    return {
        type: LOGIN_REQUEST,
    };
};

export const loginAccountSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload,
    };
};

export const loginAccountError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: {
            error,
        },
    };
};

export const logout = () => {
    return async (dispatch, getState) => {
        try {
            localStorage.removeItem('user');
            dispatch(logoutSuccess());
        } catch (error) {
            console.log(error);
        }
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};
