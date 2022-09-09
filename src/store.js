import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducers/reducer";
import thunk from "redux-thunk";

const initialState = {
    countToDelete: 0,
    images: [],
    isFetching: false,
};

export const store = createStore(reducer,initialState,applyMiddleware(thunk))