import { createStore, compose } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancer(middleware));

export default store;