import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Container } from "@material-ui/core";
import CurrentWeatherContainer from "../containers/CurrentWeatherContainer";
import { CELCIUS_SIGN } from "../assets/consts";
import moment from "moment";

import {
  fetchCurrentLocation,
  fetchCurrentWeather,
  fetchFiveDaysForecast,
} from "../redux/actions/apiActions";

import { navigateToHomeScreen } from "../redux/actions/navigateAction";

import AutoCompleteInput from "../components/AutoCompleteInput";

const Main = ({ defaultLocation }) => {
  const { currentLocationResponse } = useSelector((state) => state.apiReducer);
  const { currentWeatherResponse } = useSelector((state) => state.apiReducer);
  const { fiveDaysForecastResponse } = useSelector((state) => state.apiReducer);

  const [currentWeatherObject, setCurrentWeatherObject] = useState({});
  const [fiveDaysForecastArray, setFiveDaysForecastArray] = useState({});

  const [currentWeatherLoaded, setCurrentWeatherLoaded] = useState(false);
  const [fiveDaysForecastLoaded, setFiveDaysForecastLoaded] = useState(false);

  const [locationSearchTerm, setLocationSearchTerm] = useState(defaultLocation);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigateToHomeScreen(locationSearchTerm));
    dispatch(fetchCurrentLocation(defaultLocation));
  }, []);

  useEffect(() => {
    if (
      currentLocationResponse !== undefined &&
      currentLocationResponse.length !== 0
    ) {
      dispatch(fetchCurrentWeather(currentLocationResponse.Key));
      dispatch(fetchFiveDaysForecast(currentLocationResponse.Key));
    }
  }, [currentLocationResponse]);

  useEffect(() => {
    if (
      currentWeatherResponse !== undefined &&
      currentWeatherResponse.length !== 0
    ) {
      buildCurrentWeatherObject();
    }
  }, [currentWeatherResponse]);

  useEffect(() => {
    if (
      fiveDaysForecastResponse !== undefined &&
      fiveDaysForecastResponse.length !== 0
    ) {
      buildFiveDaysForecastArray();
    }
  }, [fiveDaysForecastResponse]);

  useEffect(() => {
    dispatch(fetchCurrentLocation(locationSearchTerm));
  }, [locationSearchTerm]);

  const buildCurrentWeatherObject = () => {
    const currentWeatherObject = {
      id: currentLocationResponse.Key,
      title: currentLocationResponse.EnglishName,
      temperature:
        currentWeatherResponse.Temperature.Metric.Value + CELCIUS_SIGN,
      icon: currentWeatherResponse.WeatherIcon,
      weatherText: currentWeatherResponse.WeatherText,
    };
    setCurrentWeatherObject(currentWeatherObject);
    setCurrentWeatherLoaded(true);
  };

  const buildFiveDaysForecastArray = () => {
    let dailyForecastsArray = [];

    for (let i in fiveDaysForecastResponse) {
      dailyForecastsArray.push({
        id: i,
        title: convertDateToShortDayName(fiveDaysForecastResponse[i].Date),
        temperature: convertAndRoundFahrenheit(
          fiveDaysForecastResponse[i].Temperature.Maximum.Value
        ),
        icon: fiveDaysForecastResponse[i].Day.Icon,
        weatherText: fiveDaysForecastResponse[i].Day.IconPhrase,
      });
    }

    setFiveDaysForecastArray(dailyForecastsArray);

    setCurrentWeatherLoaded(true);
    setFiveDaysForecastLoaded(true);
  };

  const convertAndRoundFahrenheit = (fahrenheit) => {
    const celsiusTemp = ((fahrenheit - 32) * 5) / 9;
    return Math.ceil(Math.round(celsiusTemp * 10) / 10) + CELCIUS_SIGN;
  };

  const convertDateToShortDayName = (date) => {
    return moment(date).format("dddd").substring(0, 3);
  };

  const MainContent = () => {
    return (
      <Box>
        <Box style={{ marginBottom: 24 }}>
          <AutoCompleteInput
            setLocation={(cityName) => setLocationSearchTerm(cityName)}
          />
        </Box>

        <CurrentWeatherContainer
          currentWeather={currentWeatherObject}
          fiveDaysForecast={fiveDaysForecastArray}
        />
      </Box>
    );
  };

  const Loading = () => {
    return (
      <div display={"flex"}>
        <CircularProgress />
      </div>
    );
  };

  return currentWeatherLoaded && fiveDaysForecastLoaded ? (
    <MainContent />
  ) : (
    <Loading />
  );
};

export default Main;
