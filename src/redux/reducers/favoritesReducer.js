import { ADD_TO_FAVORITE_LIST, REMOVE_FROM_FAVORITE_LIST } from "../types";

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITE_LIST: {
      if (state.indexOf(action.payload) === -1) state.push(action.payload);

      // Add location key and city name in localStorage
      localStorage.setItem(action.payload.id, JSON.stringify(action.payload));

      return state;
    }

    case REMOVE_FROM_FAVORITE_LIST: {
      const newWeatherList = state.filter((item) => item.id !== action.payload);
      state = newWeatherList;

      // Remove location key and city name from localStorage
      localStorage.removeItem(action.payload);
      return state;
    }

    default: {
      return state;
    }
  }
};

export default favoritesReducer;
