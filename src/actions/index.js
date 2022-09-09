import {ADD, DELETE, END, START, UPDATE_COUNT} from "../constants";

export const addImages = (data) => ({type: ADD, data: data})
export const deleteImage = () => ({type: DELETE})
export const updateCountToDelete = (countToDelete) => ({type: UPDATE_COUNT, countToDelete: countToDelete})
export const startDowloadingImages = () => ({type: START})
export const endDowloadingImages = () => ({type: END})

export function addCat() {
    return (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(startDowloadingImages())
            return fetch("https://api.thecatapi.com/v1/images/search?limit=10")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("could not download, status is " + response.status);
                    }
                })
                .then((arrayOfData) => {
                    dispatch(addImages(arrayOfData));
                    dispatch(endDowloadingImages())
                }).catch(() => {
                    dispatch(endDowloadingImages())
                });
        } else return Promise.resolve();
    }
}
