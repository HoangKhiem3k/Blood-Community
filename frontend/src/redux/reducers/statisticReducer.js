import { GET_TOTALDONATION, GET_TOTALDONOR, GET_TOTALRECIPIENT, GET_TOPDONORS } from '../actions/types';

const INITIAL_STATE = {
    totalDonation: 0,
    totalDonors: 0,
    totalRecipients: 0,
    topDonors: [],
};

const statisticReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOTALDONATION:
            return {
                ...state,
                totalDonation: action.payload.content[0].totalDonation,
            };
        case GET_TOTALDONOR:
            return {
                ...state,
                totalDonors: action.payload.content[0].totalDonors,
            };
        case GET_TOTALRECIPIENT:
            return {
                ...state,
                totalRecipients: action.payload.content[0].totalRecipients,
            };
        case GET_TOPDONORS:
            return {
                ...state,
                topDonors: action.payload.content,
            };
        default:
            return state;
    }
};

export default statisticReducer;
