import favoritesReducer from "./favoritesReducer";
import apiReducer from "./apiReducer";
import navigateReducer from "./navigateReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  favoritesReducer,
  apiReducer,
  navigateReducer,
});

export default rootReducers;
