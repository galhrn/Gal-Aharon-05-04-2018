import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WeatherCard from "../components/WeatherCard";
import { Grid } from "@material-ui/core";
import { removeFromFavoriteList } from "../redux/actions/favoritesActions";
import { navigateToFavoritesScreen } from "../redux/actions/navigateAction";

const Favorites = () => {
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
    <Grid container spacing={3}>
      {favoritesList.map((item) => (
        <WeatherCard
          key={item.id}
          item={item}
          isFavorite
          onToggle={(key) => dispatch(removeFromFavoriteList(key))}
        />
      ))}
    </Grid>
  );
};

export default Favorites;
