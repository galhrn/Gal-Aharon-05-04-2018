import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Main from "../pages/Main";
import Favorites from "../pages/Favorites";
import { useSelector } from "react-redux";
import { TEL_AVIV } from "../assets/consts";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "static",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const NavigationContainer = () => {
  const classes = useStyles();
  const navigateReducer = useSelector((state) => state.navigateReducer);
  const [value, setValue] = React.useState(0);
  const [defaultLocation, setDefaultLocation] = React.useState(TEL_AVIV);

  useEffect(() => {
    if (value && !navigateReducer.navigationIndex) {
      setDefaultLocation(navigateReducer.defaultWeatherCountry);
      setValue(0);
    }
  }, [navigateReducer]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="home" {...a11yProps(0)} />
          <Tab label="favorites" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel
        value={value}
        index={0}
        children={<Main defaultLocation={defaultLocation} />}
      />
      <TabPanel value={value} index={1} children={<Favorites />} />
    </Box>
  );
};
export default NavigationContainer;
