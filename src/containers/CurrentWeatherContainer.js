import React, { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Paper } from "@material-ui/core";
import FavoriteToggle from "../components/FavoriteToggle";

import { useDispatch } from "react-redux";
import {
  addToFavoriteList,
  removeFromFavoriteList,
} from "../redux/actions/favoritesActions";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: "12px 12px 24px 24px",
  },
  control: {
    padding: theme.spacing(2),
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
    <Paper variant="outlined" className={classes.paper}>
      <Box
        component="span"
        display="flex"
        style={{ padding: "24px 24px 48px 0px" }}
      >
        <Box>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${
              currentWeather.icon < 10 ? "0" : ""
            }${currentWeather.icon}-s.png`}
          />
        </Box>
        <Box flexGrow={1}>
          <Typography variant="h5" component="h2">
            {currentWeather.title}
          </Typography>

          <Typography variant="body1" component="span">
            {currentWeather.weatherText}
          </Typography>

          <Typography variant="h4" component="h2" color={"primary"}>
            {currentWeather.temperature}
          </Typography>
        </Box>
        {<FavoriteToggle isFavorite={isFavorite} onToggle={onFavoriteToggle} />}
      </Box>
      <Grid container className={classes.root} spacing={3}>
        {fiveDaysForecast.map((item) => (
          <WeatherCard
            key={item.id}
            item={item}
            isFavorite={false}
            onToggle={() => {}}
          />
        ))}
      </Grid>
    </Paper>
  );
};

export default CurrentWeather;
