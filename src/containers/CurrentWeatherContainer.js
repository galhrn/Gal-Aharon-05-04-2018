import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper } from "@material-ui/core";
import FavoriteToggle from "../components/FavoriteToggle";

import { useDispatch } from "react-redux";
import {
  addToFavoriteList,
  removeFromFavoriteList,
} from "../redux/actions/favoritesActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: "1em",
  },
  paper: {},
  control: {
    padding: "1em",
  },

  header: {},
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },

  subTitle: {
    fontSize: "1rem",
    color: theme.palette.grey[400],
    marginLeft: "1",
  },

  temperature: {
    fontSize: "3rem",
    color: theme.palette.primary.main,
  },

  imageContainer: {
    paddingRight: "1em",
  },

  image: {
    width: "100%",
  },
}));

const CurrentWeather = ({ currentWeather, fiveDaysForecast }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const onFavoriteToggle = () => {
    setIsFavorite(!isFavorite);

    !isFavorite
      ? dispatch(addToFavoriteList(currentWeather))
      : dispatch(removeFromFavoriteList(currentWeather.id));
  };

  const checkIfFavorite = () => {
    if (localStorage.getItem(currentWeather.id)) {
      setIsFavorite(true);
    }
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <Box component="span" display="flex">
        <Box className={classes.imageContainer}>
          <img
            className={classes.image}
            src={`https://developer.accuweather.com/sites/default/files/${
              currentWeather.icon < 10 ? "0" : ""
            }${currentWeather.icon}-s.png`}
            alt="weather-icon"
          />
        </Box>
        <Box flexGrow={1}>
          <Box className={classes.header}>
            <Box className={classes.title}>{currentWeather.title}</Box>
            <Box className={classes.subTitle}>{currentWeather.weatherText}</Box>
          </Box>

          <Box className={classes.temperature}>
            {currentWeather.temperature}
          </Box>
        </Box>
        {<FavoriteToggle isFavorite={isFavorite} onToggle={onFavoriteToggle} />}
      </Box>
    </Paper>
  );
};

export default CurrentWeather;
