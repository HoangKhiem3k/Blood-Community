import { toast } from 'react-toastify';
import { toastError } from '../../utils/toastUtils';
import {
    FETCH_HOSPITAL_REQUEST,
    FETCH_HOSPITAL_SUCCESS,
    FETCH_HOSPITAL_ERROR,
    CREATE_USER_ERROR,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    FETCH_SINGLE_HOSPITAL_SUCCESS,
    FETCH_SINGLE_HOSPITAL_ERROR,
    FETCH_SINGLE_HOSPITAL_REQUEST,
    UPDATE_HOSPITAL_REQUEST,
    UPDATE_HOSPITAL_SUCCESS,
    UPDATE_HOSPITAL_ERROR,
    DELETE_HOSPITAL_REQUEST,
    DELETE_HOSPITAL_SUCCESS,
    DELETE_HOSPITAL_ERROR,
    FETCH_DONOR_REQUEST,
    FETCH_DONOR_SUCCESS,
    FETCH_DONOR_ERROR,
    CREATE_DONOR_ERROR,
    CREATE_DONOR_REQUEST,
    CREATE_DONOR_SUCCESS,
    FETCH_SINGLE_DONOR_SUCCESS,
    FETCH_SINGLE_DONOR_ERROR,
    FETCH_SINGLE_DONOR_REQUEST,
    UPDATE_DONOR_REQUEST,
    UPDATE_DONOR_SUCCESS,
    UPDATE_DONOR_ERROR,
    FETCH_RECIPIENT_REQUEST,
    FETCH_RECIPIENT_SUCCESS,
    FETCH_RECIPIENT_ERROR,
    CREATE_RECIPIENT_ERROR,
    CREATE_RECIPIENT_REQUEST,
    CREATE_RECIPIENT_SUCCESS,
    FETCH_SINGLE_RECIPIENT_SUCCESS,
    FETCH_SINGLE_RECIPIENT_ERROR,
    FETCH_SINGLE_RECIPIENT_REQUEST,
    UPDATE_RECIPIENT_REQUEST,
    UPDATE_RECIPIENT_SUCCESS,
    UPDATE_RECIPIENT_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    listHospitals: [],
    listDonors: [],
    listRecipients: [],
    hospital: {},
    donor: {},
    recipient: {},
    isLoading: false,
    isError: false,
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_HOSPITAL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_HOSPITAL_SUCCESS:
            return {
                ...state,
                listHospitals: action.payload.content,
                isLoading: false,
                isError: false,
            };
        case FETCH_HOSPITAL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case CREATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case CREATE_USER_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case CREATE_USER_ERROR:
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case FETCH_SINGLE_HOSPITAL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_SINGLE_HOSPITAL_SUCCESS:
            return {
                ...state,
                hospital: action.payload.content,
                isLoading: false,
                isError: false,
            };
        case FETCH_SINGLE_HOSPITAL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case UPDATE_HOSPITAL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case UPDATE_HOSPITAL_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case UPDATE_HOSPITAL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case DELETE_HOSPITAL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case DELETE_HOSPITAL_SUCCESS:
            toast.success(action.payload);
            toast.success(action.payload.message);
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case DELETE_HOSPITAL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case FETCH_DONOR_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_DONOR_SUCCESS:
            return {
                ...state,
                listDonors: action.payload.content,
                isLoading: false,
                isError: false,
            };
        case FETCH_DONOR_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case FETCH_SINGLE_DONOR_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_SINGLE_DONOR_SUCCESS:
            return {
                ...state,
                donor: action.payload.content,
                isLoading: false,
                isError: false,
            };
        case FETCH_SINGLE_DONOR_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case UPDATE_DONOR_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case UPDATE_DONOR_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case UPDATE_DONOR_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case FETCH_RECIPIENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_RECIPIENT_SUCCESS:
            return {
                ...state,
                listRecipients: action.payload.content,
                isLoading: false,
                isError: false,
            };
        case FETCH_RECIPIENT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case FETCH_SINGLE_RECIPIENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_SINGLE_RECIPIENT_SUCCESS:
            return {
                ...state,
                recipient: action.payload.content,
                isLoading: false,
                isError: false,
            };
        case FETCH_SINGLE_RECIPIENT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case UPDATE_RECIPIENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case UPDATE_RECIPIENT_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case UPDATE_RECIPIENT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            return state;
    }
};

export default usersReducer;
