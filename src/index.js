import React from 'react';
import ReactDOM from 'react-dom/client';
import {applyMiddleware, createStore} from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import thunk from 'redux-thunk';

import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from "./reducers/reducer";

const root = ReactDOM.createRoot(document.getElementById('root'));

const initialState = {
    countToDelete: 0,
    images: [],
    isFetching: false,
};

const store = createStore(reducer,initialState,applyMiddleware(thunk))
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
