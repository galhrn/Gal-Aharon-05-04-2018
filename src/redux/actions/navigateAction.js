import { NAVIGATE_TO_HOME_SCREEN, NAVIGATE_TO_FAVORITE_SCREEN } from "../types";

export const navigateToHomeScreen = (defaultWeatherLocation) => {
  return {
    type: NAVIGATE_TO_HOME_SCREEN,
    payload: defaultWeatherLocation,
  };
};

export const navigateToFavoritesScreen = () => {
  return {
    type: NAVIGATE_TO_FAVORITE_SCREEN,
  };
};
