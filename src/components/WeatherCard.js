import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@material-ui/core";

import FavoriteToggle from "../components/FavoriteToggle";
import { navigateToHomeScreen } from "../redux/actions/navigateAction";

const WeatherCard = ({ item, isFavorite, onToggle }) => {
  const [isCurrentWeatherLoaded, setIsCurrentWeatherLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsCurrentWeatherLoaded(true);
  }, [item]);

  const WeatherIcon = () => {
    return (
      <Box>
        <Box display="flex" justifyContent="center" m={1} p={1}>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${
              item.icon < 10 ? "0" : ""
            }${item.icon}-s.png`}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography noWrap variant="body2" component={"span"}>
            {item.weatherText}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Grid key={item.id} item>
      <Card style={{ minWidth: 140 }}>
        <CardContent
          disabled={true}
          onClick={() => {
            isFavorite && dispatch(navigateToHomeScreen(item.title));
          }}
          style={{ cursor: isFavorite ? "pointer" : null }}
        >
          <Box display="flex" flexDirection="row">
            <Box flexGrow={1}>
              <Box>
                <Typography variant="h6" component={"span"}>
                  {item.title}
                </Typography>
              </Box>

              <Typography variant="body1" component={"span"}>
                {item.temperature}
              </Typography>
            </Box>

            {isFavorite && (
              <FavoriteToggle isFavorite onToggle={() => onToggle(item.id)} />
            )}
          </Box>

          <Box display="flex" justifyContent="center">
            {isCurrentWeatherLoaded ? <WeatherIcon /> : <CircularProgress />}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default WeatherCard;
