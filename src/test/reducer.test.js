const {ADD, DELETE, UPDATE_COUNT, START, END} = require("../constants");
const {reducer} = require("../reducers/reducer");

test('pass addImages action', () => {
    const state = {
        images: ["first", "second"]
    };
    const action = {
        type: ADD,
        data: ["third", "fourth"]
    }
    expect(reducer(state, action)).toStrictEqual({...state, images: [...state.images, ...action.data]});
})

test('pass deleteImage action', () => {
    const state = {
        images: ["first", "second"],
        countToDelete: 1
    };
    const action = {
        type: DELETE,
    }
    expect(reducer(state, action)).toStrictEqual({...state, images: state.images.slice(state.countToDelete)});
})

test('pass updateCountToDelete action', () => {

    const state = {
        images: ["first", "second"],
        countToDelete: 1
    };
    const action = {
        type: UPDATE_COUNT,
        countToDelete: 2
    }
    expect(reducer(state, action)).toStrictEqual({...state, countToDelete: Number(action.countToDelete)});
})

test('pass startDowloadingImages action', () => {

    const state = {
        isFetching: false,
    };
    const action = {
        type: START,
    }
    expect(reducer(state, action)).toStrictEqual({...state, isFetching: true});
})

test('pass endDowloadingImages action', () => {

    const state = {
        isFetching: true,
    };
    const action = {
        type: END,
    }
    expect(reducer(state, action)).toStrictEqual({...state, isFetching: false});
})
test('pass incorrect action', () => {

    const state = {
        images: ["first", "second"],
        countToDelete: 1,
        isFetching: true,
    };
    const action = {
        type: "ERRROR",
    }
    expect(reducer(state, action)).toStrictEqual(state);
})



