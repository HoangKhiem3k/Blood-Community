import axios from 'axios';
import { DOMAIN_BACKEND } from '../../config/settingSystem';
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
} from './types';

export const fetchAllSchedulesById = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(`${DOMAIN_BACKEND}/api/get-schedule-hospital-by-id`, {
                params: { id: id },
            });
            const data = res && res.data ? res.data : [];
            dispatch(fetchSchedulesByIdSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const fetchSchedulesByIdSuccess = (payload) => {
    return {
        type: FETCH_SCHEDULES_BYID_SUCCESS,
        payload,
    };
};

export const deleteSchedule = (item) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.delete(`${DOMAIN_BACKEND}/api/delete-schedule`, { data: { id: item.id } });
            const data = res && res.data ? res.data : [];
            dispatch(deleteScheduleSuccess(data));
            dispatch(fetchAllSchedulesById(item.hospitalId));
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteScheduleSuccess = (payload) => {
    return {
        type: DELETE_SCHEDULE_SUCCESS,
        payload,
    };
};

export const createSchedule = (data) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${DOMAIN_BACKEND}/api/create-schedule`, data);
            dispatch(createSchedulesSuccess(res.data));
            dispatch(fetchAllSchedulesById(data.hospitalId));
        } catch (e) {
            dispatch(createSchedulesFail(e.response.data));
        }
    };
};
export const createSchedulesSuccess = (payload) => {
    return {
        type: CREATE_SCHEDULES_SUCCESS,
        payload,
    };
};
export const createSchedulesFail = (payload) => {
    return {
        type: CREATE_SCHEDULES_FAILED,
        payload,
    };
};

export const fetchAllEvents = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(`${DOMAIN_BACKEND}/api/get-all-events`);
            const data = res && res.data ? res.data : [];
            dispatch(fetchEventsSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const fetchEventsSuccess = (payload) => {
    return {
        type: FETCH_EVENTS_SUCCESS,
        payload,
    };
};

export const createEvent = (event) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.post(`${DOMAIN_BACKEND}/api/create-event`, event);
            const data = res && res.data ? res.data : [];
            dispatch(createEventSuccess(data));
            dispatch(fetchAllEvents(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const createEventSuccess = (payload) => {
    return {
        type: CREATE_EVENT_SUCCESS,
        payload,
    };
};

export const updateEvent = (event) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.put(`${DOMAIN_BACKEND}/api/update-event`, event);
            const data = res && res.data ? res.data : [];
            dispatch(updateEventSuccess(data));
            dispatch(fetchAllEvents(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateEventSuccess = (payload) => {
    return {
        type: UPDATE_EVENT_SUCCESS,
        payload,
    };
};

export const deleteEvent = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.delete(`${DOMAIN_BACKEND}/api/delete-event`, { data: { id } });
            const data = res && res.data ? res.data : [];
            dispatch(deleteEventSuccess(data));
            dispatch(fetchAllEvents(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteEventSuccess = (payload) => {
    return {
        type: DELETE_EVENT_SUCCESS,
        payload,
    };
};

// booking
export const fetchNewestDonorBooking = (donor) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.post(`${DOMAIN_BACKEND}/api/get-newest-booking-of-user`, { id: donor.id });
            const data = res && res.data ? res.data : [];
            dispatch(fetchNewestDonorBookingSuccess(data.content[0]));
        } catch (error) {
            dispatch(fetchNewestDonorBookingError(error));
        }
    };
};

export const fetchNewestDonorBookingSuccess = (payload) => {
    return {
        type: FETCH_NEWEST_DONOR_BOOKING_SUCCESS,
        payload,
    };
};

export const fetchNewestDonorBookingError = (payload) => {
    return {
        type: FETCH_NEWEST_DONOR_BOOKING_ERROR,
        payload,
    };
};

export const fetchAllBookingByDonorId = (donorId) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(`${DOMAIN_BACKEND}/api/get-all-booking-by-donor-id`, {
                params: { donorId: donorId },
            });
            const data = res && res.data ? res.data : [];
            dispatch(fetchAllBookingByDonorIdSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const fetchAllBookingByDonorIdSuccess = (payload) => {
    return {
        type: FETCH_ALL_BOOKING_BY_DONORID_SUCCESS,
        payload,
    };
};
