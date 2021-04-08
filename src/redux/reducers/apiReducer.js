import {
  GET_CURRENT_LOCATION,
  GET_CURRENT_WEATHER,
  GET_FIVE_DAYS_FORECAST,
} from "../types";

const initialState = {
  currentLocationResponse: [],
  currentWeatherResponse: [],
  fiveDaysForecastResponse: [],
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LOCATION: {
      return {
        ...state,
        currentLocationResponse: action.payload,
      };
    }
    case GET_CURRENT_WEATHER: {
      return {
        ...state,
        currentWeatherResponse: action.payload,
      };
    }
    case GET_FIVE_DAYS_FORECAST: {
      return {
        ...state,
        fiveDaysForecastResponse: action.payload,
      };
    }

    default:
      return state;
  }
};

export default apiReducer;
