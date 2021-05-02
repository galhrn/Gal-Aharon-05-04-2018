import {
  GET_CURRENT_LOCATION,
  GET_CURRENT_WEATHER,
  GET_FIVE_DAYS_FORECAST,
} from "../types";
import axios from "axios";

import { LOCATION_ERROR, LOCATION_NOT_FOUND } from "../../assets/consts";
import toast from "react-simple-toasts";
import accuWeatherUrl from "../../modules/accuWeatherUrl";

export const fetchCurrentLocation = (cityName) => {
  return async (dispatch) => {
    return axios
      .get(accuWeatherUrl.currentLocation(cityName))
      .then((res) => {
        if (res.data[0]) {
          dispatch({
            type: GET_CURRENT_LOCATION,
            payload: res.data[0],
          });
        } else {
          toast(LOCATION_NOT_FOUND);
        }
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          toast(LOCATION_ERROR + "\n" + err.response);
        } else if (err.request) {
          // client never received a response, or request never left
          toast(LOCATION_ERROR);
        }
      });
  };
};

export const fetchCurrentWeather = (locationKey) => {
  return async (dispatch) => {
    return axios
      .get(accuWeatherUrl.currentWeather(locationKey))
      .then((res) => {
        dispatch({
          type: GET_CURRENT_WEATHER,
          payload: res.data[0],
        });
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          toast(LOCATION_ERROR + "\n" + err.response);
        } else if (err.request) {
          // client never received a response, or request never left
          toast(LOCATION_ERROR);
        }
      });
  };
};

export const fetchFiveDaysForecast = (locationKey) => {
  return async (dispatch) => {
    return axios
      .get(accuWeatherUrl.fiveDaysForecast(locationKey))
      .then((res) => {
        dispatch({
          type: GET_FIVE_DAYS_FORECAST,
          payload: res.data.DailyForecasts,
        });
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          toast(LOCATION_ERROR + "\n" + err.response);
        } else if (err.request) {
          // client never received a response, or request never left
          toast(LOCATION_ERROR);
        }
      });
  };
};
