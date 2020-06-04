import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import createSagaMiddleware from "redux-saga";

import App from "./Components/App";
import Reducer from "./_Reducers";
import rootSaga from "./sagas";
import "antd/dist/antd.css"

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  sagaMiddleware
  )(createStore);
  
  
  
  ReactDOM.render(
    <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
      >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
  );
  
  sagaMiddleware.run(rootSaga);