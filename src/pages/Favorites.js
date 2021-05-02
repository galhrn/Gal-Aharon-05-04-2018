import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WeatherCard from "../components/WeatherCard";
import { removeFromFavoriteList } from "../redux/actions/favoritesActions";
import { navigateToFavoritesScreen } from "../redux/actions/navigateAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridGap: "1rem",

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridAutoFlow: "rows",
    },

    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
      gridTemplateRows: "repeat(5, 1fr)",
    },
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const favoritesReducer = useSelector((state) => state.favoritesReducer);
  const [favoritesList, setFavoritesList] = useState(favoritesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigateToFavoritesScreen());
  }, []);

  useEffect(() => {
    setFavoritesList(favoritesReducer);
  }, [favoritesReducer]);

  return (
    <div className={classes.root}>
      {favoritesList.map((item) => (
        <WeatherCard
          key={item.id}
          item={item}
          isFavorite
          onToggle={(key) => dispatch(removeFromFavoriteList(key))}
        />
      ))}
    </div>
  );
};

export default Favorites;
