import {ADD, DELETE, END, START, UPDATE_COUNT} from "../constants";

const reducer = (state = {}, action = {}) => {
    switch (action.type) {
        case ADD:
            return {...state, images: [...state.images, ...action.data]}
        case DELETE:
            return {...state, images: state.images.slice(state.countToDelete)}

        case UPDATE_COUNT:
            return {...state, countToDelete: Number(action.countToDelete)}

        case START:
            return {...state, isFetching: true}
        case END:
            return {...state, isFetching: false}

        default:
            return state;
    }
};

export default reducer