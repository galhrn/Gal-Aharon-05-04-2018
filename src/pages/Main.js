import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, makeStyles } from "@material-ui/core";
import CurrentWeatherContainer from "../containers/CurrentWeatherContainer";
import { CELCIUS_SIGN } from "../assets/consts";
import moment from "moment";
import WeatherCard from "../components/WeatherCard";

import {
  fetchCurrentLocation,
  fetchCurrentWeather,
  fetchFiveDaysForecast,
} from "../redux/actions/apiActions";

import { navigateToHomeScreen } from "../redux/actions/navigateAction";

import AutoCompleteInput from "../components/AutoCompleteInput";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridGap: "1rem",

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
      gridTemplateAreas: `"search" "current " "card1" "card2" "card3" "card4" "card5"`,
    },

    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
      gridTemplateRows: "auto",
      gridTemplateAreas: `"search search search search search"
                          "current current current current current"
                          "card1 card2 card3 card4 card5"`,
    },
  },

  search: {
    gridArea: "search",
  },
  current: {
    gridArea: "current",
  },
  card1: {
    gridArea: "card1",
  },
  card2: {
    gridArea: "card2",
  },
  card3: {
    gridArea: "card3",
  },
  card4: {
    gridArea: "card4",
  },
  card5: {
    gridArea: "card5",
  },
}));

const Main = ({ defaultLocation }) => {
  const { currentLocationResponse } = useSelector((state) => state.apiReducer);
  const { currentWeatherResponse } = useSelector((state) => state.apiReducer);
  const { fiveDaysForecastResponse } = useSelector((state) => state.apiReducer);

  const [currentWeatherObject, setCurrentWeatherObject] = useState({});
  const [fiveDaysForecastArray, setFiveDaysForecastArray] = useState({});

  const [currentWeatherLoaded, setCurrentWeatherLoaded] = useState(false);
  const [fiveDaysForecastLoaded, setFiveDaysForecastLoaded] = useState(false);

  const [locationSearchTerm, setLocationSearchTerm] = useState(defaultLocation);
  const [isLoading, setIsLoading] = useState(false);

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
    if (isLoading) setIsLoading(false);
  };

  const convertAndRoundFahrenheit = (fahrenheit) => {
    const celsiusTemp = ((fahrenheit - 32) * 5) / 9;
    return Math.ceil(Math.round(celsiusTemp * 10) / 10) + CELCIUS_SIGN;
  };

  const convertDateToShortDayName = (date) => {
    return moment(date).format("dddd").substring(0, 3);
  };

  const setLocation = (searchTerm) => {
    setIsLoading(true);
    setLocationSearchTerm(searchTerm);
  };

  const MainContent = () => {
    const classes = useStyle();

    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <AutoCompleteInput setLocation={setLocation} />
        </div>

        <div className={classes.current}>
          <CurrentWeatherContainer currentWeather={currentWeatherObject} />
        </div>

        {fiveDaysForecastArray.map((item, index) => (
          <div key={item.id} className={classes[`card${index + 1}`]}>
            <WeatherCard item={item} isFavorite={false} onToggle={() => {}} />
          </div>
        ))}
      </div>
    );
  };

  const Loading = () => {
    return (
      <div display={"flex"}>
        <CircularProgress />
      </div>
    );
  };

  return currentWeatherLoaded && fiveDaysForecastLoaded && !isLoading ? (
    <MainContent />
  ) : (
    <Loading />
  );
};

export default Main;
