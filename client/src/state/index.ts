import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import api from "../utils/APIService";
import logger from "redux-logger";

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api), logger)
);

export default store;
