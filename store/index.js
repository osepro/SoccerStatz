import { createStore, compose } from "redux";
import cardentries from "../reducers";
import middleware from "../middleware";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(cardentries, composeEnhancer(middleware));

export default store;