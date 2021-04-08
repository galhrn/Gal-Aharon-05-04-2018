import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToFavoriteList } from "./redux/actions/favoritesActions";
import NavigationContainer from "./containers/NavigationContainer";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { LIGHT } from "./assets/consts";

const Main = () => {
  const [selectedTheme, setSelectedTheme] = useState(LIGHT);
  const dispatch = useDispatch();

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: selectedTheme,
        },
      }),
    [selectedTheme]
  );

  useEffect(() => {
    for (let [, value] of Object.entries(localStorage)) {
      dispatch(addToFavoriteList(JSON.parse(value)));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationContainer
        theme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
      />
    </ThemeProvider>
  );
};

export default Main;
