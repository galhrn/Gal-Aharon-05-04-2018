import { ADD_TO_FAVORITE_LIST, REMOVE_FROM_FAVORITE_LIST } from "../types";

export const addToFavoriteList = (weatherLocation) => {
  return {
    type: ADD_TO_FAVORITE_LIST,
    payload: weatherLocation,
  };
};

export const removeFromFavoriteList = (weatherLocation) => {
  return {
    type: REMOVE_FROM_FAVORITE_LIST,
    payload: weatherLocation,
  };
};
