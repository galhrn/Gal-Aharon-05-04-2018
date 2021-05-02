import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";

import { navigateToHomeScreen } from "../redux/actions/navigateAction";
import { Delete } from "@material-ui/icons";
import accuWeatherUrl from "../modules/accuWeatherUrl";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    cursor: (isFavorite) => (isFavorite ? "pointer" : null),
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: "1em",
    "&:hover": {
      boxShadow: (isFavorite) => (isFavorite ? theme.shadows[4] : null),
    },
    padding: "1em",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      paddingLeft: "1em",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column",
      alignItems: "left",
    },
  },

  header: {
    alignItems: "left",
    display: "flex",
    flexDirection: "column",
    flex: 1,

    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
    },
  },

  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },

  subTitle: {
    fontSize: "0.9rem",
    color: theme.palette.grey[500],
    [theme.breakpoints.up("sm")]: {
      textAlign: "center",
    },
  },
  deleteBtn: {
    padding: "1em",
  },

  image: {
    padding: "1em",
  },

  "@keyframes fadeOut": {
    from: {
      opacity: 1,
      transform: "scale(1)",
    },
    to: {
      opacity: 0,
      transform: "scale(0)",
    },
  },

  fadeOutAnimation: {
    animation: "$fadeOut",
    animationDuration: "500ms",
    animationFillMode: "forwards",
  },
}));

const WeatherCard = ({ item, isFavorite, onToggle }) => {
  const classes = useStyle(isFavorite);
  const [isCurrentWeatherLoaded, setIsCurrentWeatherLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsCurrentWeatherLoaded(true);
  }, [item]);

  const WeatherIcon = () => {
    return (
      <img
        width={"100%"}
        alt="weather-icon"
        src={`${accuWeatherUrl.filesUrl}${item.icon < 10 ? "0" : ""}${
          item.icon
        }-s.png`}
      />
    );
  };

  const onClickHandler = (e) => {
    e.stopPropagation();
    setFadeOut(true);
  };

  return (
    <Paper
      className={clsx(classes.root, fadeOut && classes.fadeOutAnimation)}
      elevation={0}
      disabled={!isFavorite}
      onAnimationEnd={() => {
        onToggle(item.id);
      }}
      onClick={() => {
        dispatch(navigateToHomeScreen(item.title));
      }}
    >
      <Box className={classes.header}>
        <Box className={classes.title}>{item.title}</Box>
        <Box className={classes.subTitle}>{item.weatherText}</Box>
      </Box>

      <Box className={classes.image}>
        {isCurrentWeatherLoaded ? <WeatherIcon /> : <CircularProgress />}
      </Box>

      <Box className={classes.title}>{item.temperature}</Box>

      {isFavorite && (
        <div className={classes.deleteBtn}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<Delete />}
            onClick={onClickHandler}
          >
            delete
          </Button>
        </div>
      )}
    </Paper>
  );
};
export default WeatherCard;
