import { FETCH_ALLCODE_SCHEDULE_TIME_FAILED, FETCH_ALLCODE_SCHEDULE_TIME_REQUEST, FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS } from "../actions/types";

const INITIAL_STATE = {
    listTimeTypes: [],
    isLoading: false,
    isError: false,
};
const allCodeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALLCODE_SCHEDULE_TIME_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            return {
                ...state,
                listTimeTypes: action.payload.content,
                isLoading: false,
                isError: false,
            };
        case FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        
        default:
            return state;
    }
};

export default allCodeReducer;