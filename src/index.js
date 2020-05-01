import React from "react";
import App from "./App";
import {Provider} from "react-redux";
import covid_reducer from "./reducer";
import {createStore,applyMiddleware} from "redux";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import ReduxPromise from "redux-promise"; 
import { composeWithDevTools } from 'redux-devtools-extension';
export const STORE=createStore(covid_reducer,composeWithDevTools(applyMiddleware(ReduxPromise,thunk)));
console.log(STORE.getState());
ReactDOM.render(
    <Provider store={STORE}>
      <App/>
    </Provider>,
    document.getElementById('root')
)