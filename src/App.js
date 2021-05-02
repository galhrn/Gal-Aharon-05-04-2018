import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToFavoriteList } from "./redux/actions/favoritesActions";
import NavBar from "./components/NavBar";
import { CssBaseline, makeStyles, Box } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    background:
      "url(https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6) no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
  },
}));

const App = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    for (let [, value] of Object.entries(localStorage)) {
      dispatch(addToFavoriteList(JSON.parse(value)));
    }
  }, []);

  return (
    <div>
      <CssBaseline />
      <Box className={classes.root}>
        <NavBar />
      </Box>
    </div>
  );
};

export default App;
