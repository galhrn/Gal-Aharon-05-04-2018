import { TEL_AVIV } from "../../assets/consts";
import { NAVIGATE_TO_HOME_SCREEN, NAVIGATE_TO_FAVORITE_SCREEN } from "../types";

const initialState = {
  navigationIndex: 0,
  defaultWeatherCountry: TEL_AVIV,
};
const navigateReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE_TO_HOME_SCREEN: {
      return {
        ...state,
        navigationIndex: 0,
        defaultWeatherCountry: action.payload,
      };
    }

    case NAVIGATE_TO_FAVORITE_SCREEN: {
      return {
        ...state,
        navigationIndex: 1,
      };
    }

    default: {
      return state;
    }
  }
};

export default navigateReducer;
