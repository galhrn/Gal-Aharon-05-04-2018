import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Main from "../pages/Main";
import Favorites from "../pages/Favorites";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import { DARK, LIGHT, TEL_AVIV } from "../assets/consts";
import Moon from "@material-ui/icons/Brightness2";
import Sun from "@material-ui/icons/WbSunny";
import { colors, IconButton } from "@material-ui/core";

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

const NavigationContainer = ({ theme, setSelectedTheme }) => {
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

  const changeTheme = () => {
    theme === LIGHT ? setSelectedTheme(DARK) : setSelectedTheme(LIGHT);
  };

  const icon = theme === LIGHT ? <Moon /> : <Sun />;

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        position="static"
        style={
          theme === DARK
            ? { backgroundColor: "#303030" }
            : { backgroundColor: colors.primary }
        }
      >
        <Box display="flex">
          <Box flexGrow={1}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="off"
              aria-label="scrollable prevent tabs example"
            >
              <Tab icon={<HomeIcon />} aria-label="home" {...a11yProps(0)} />
              <Tab
                icon={<FavoriteIcon />}
                aria-label="favorite"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <Box style={{ paddingRight: 24 }}>
            <IconButton
              style={{ color: "white" }}
              onClick={changeTheme}
              children={icon}
            />
          </Box>
        </Box>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        children={<Main defaultLocation={defaultLocation} />}
      />
      <TabPanel value={value} index={1} children={<Favorites />} />
    </React.Fragment>
  );
};
export default NavigationContainer;
