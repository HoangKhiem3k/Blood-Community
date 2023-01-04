import axios from 'axios';
import { DOMAIN_BACKEND } from '../../config/settingSystem';
// import axios from '../../utils/customizeAxios';

import {
    FETCH_DONOR_ERROR,
    FETCH_DONOR_REQUEST,
    FETCH_DONOR_SUCCESS,
    FETCH_SINGLE_DONOR_SUCCESS,
    FETCH_SINGLE_DONOR_ERROR,
    FETCH_SINGLE_DONOR_REQUEST,
    UPDATE_DONOR_REQUEST,
    UPDATE_DONOR_SUCCESS,
    UPDATE_DONOR_ERROR,
} from './types';

// fetch all donor
export const fetchAllDonor = () => {
    return async (dispatch, getState) => {
        dispatch(fetchDonorRequest());
        try {
            const res = await axios.get(`${DOMAIN_BACKEND}/api/get-user-by-type`, { params: { type: 'R3' } });
            const data = res && res.data ? res.data : [];
            dispatch(fetchDonorSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchDonorError(error));
        }
    };
};

export const fetchDonorRequest = () => {
    return {
        type: FETCH_DONOR_REQUEST,
    };
};

export const fetchDonorSuccess = (payload) => {
    return {
        type: FETCH_DONOR_SUCCESS,
        payload,
    };
};

export const fetchDonorError = () => {
    return {
        type: FETCH_DONOR_ERROR,
    };
};

// get donor by id
export const fetchDonorById = (id) => {
    return async (dispatch, getState) => {
        dispatch(fetchDonorByIdRequest());
        try {
            const res = await axios.get(`${DOMAIN_BACKEND}/api/get-user-by-id`, { params: { id: id } });
            const data = res && res.data ? res.data : [];
            dispatch(fetchDonorByIdSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchDonorByIdError());
        }
    };
};

export const fetchDonorByIdRequest = () => {
    return {
        type: FETCH_SINGLE_DONOR_REQUEST,
    };
};

export const fetchDonorByIdSuccess = (payload) => {
    return {
        type: FETCH_SINGLE_DONOR_SUCCESS,
        payload,
    };
};

export const fetchDonorByIdError = () => {
    return {
        type: FETCH_SINGLE_DONOR_ERROR,
    };
};

// update Donor
export const updateDonor = (donor) => {
    return async (dispatch, getState) => {
        dispatch(updateDonorRequest());
        try {
            const res = await axios.put(`${DOMAIN_BACKEND}/api/update-user`, donor);
            const data = res && res.data ? res.data : [];
            dispatch(updateDonorSuccess(data));
            dispatch(fetchAllDonor());
        } catch (error) {
            console.log(error);
            dispatch(updateDonorError());
        }
    };
};

export const updateDonorRequest = () => {
    return {
        type: UPDATE_DONOR_REQUEST,
    };
};

export const updateDonorSuccess = (payload) => {
    return {
        type: UPDATE_DONOR_SUCCESS,
        payload,
    };
};

export const updateDonorError = () => {
    return {
        type: UPDATE_DONOR_ERROR,
    };
};
