import { TURN_OFF_LOADER, TURN_ON_LOADER } from '../actions/types'
const initialState = {
  isLoading: false,
}

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TURN_ON_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case TURN_OFF_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loaderReducer;


