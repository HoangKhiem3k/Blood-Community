import {
    CREATE_EVENT_SUCCESS,
    CREATE_SCHEDULES_FAILED,
    CREATE_SCHEDULES_SUCCESS,
    DELETE_EVENT_SUCCESS,
    DELETE_SCHEDULE_SUCCESS,
    FETCH_ALL_BOOKING_BY_DONORID_SUCCESS,
    FETCH_EVENTS_SUCCESS,
    FETCH_NEWEST_DONOR_BOOKING_ERROR,
    FETCH_NEWEST_DONOR_BOOKING_SUCCESS,
    FETCH_SCHEDULES_BYID_SUCCESS,
    UPDATE_EVENT_SUCCESS,
} from '../actions/types';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    listEvents: [],
    listSingleSchedules: [],
    newestDonorBooking: null,
    listBookingsByDonorId: [],
};

const hospitalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_SCHEDULES_SUCCESS:
            toast.success(action.payload.message);
            return state;
        case CREATE_SCHEDULES_FAILED:
            toast.error(action.payload.message);
            return state;
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                listEvents: action.payload.content,
            };
        case CREATE_EVENT_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
            };
        case UPDATE_EVENT_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
            };
        case DELETE_EVENT_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
            };
        case FETCH_SCHEDULES_BYID_SUCCESS:
            return {
                ...state,
                listSingleSchedules: action.payload.content,
            };
        case DELETE_SCHEDULE_SUCCESS:
            toast.success(action.payload.message);
            return state;
        case FETCH_NEWEST_DONOR_BOOKING_ERROR:
            return {
                ...state,
                newestDonorBooking: null,
            };
        case FETCH_NEWEST_DONOR_BOOKING_SUCCESS:
            return {
                ...state,
                newestDonorBooking: action.payload,
            };
        case FETCH_ALL_BOOKING_BY_DONORID_SUCCESS:
            return {
                ...state,
                listBookingsByDonorId: action.payload.content,
            };
        default:
            return state;
    }
};
export default hospitalReducer;
