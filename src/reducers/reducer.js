const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {...state, images: [...state.images, ...action.data]}
        case
        'DELETE'
        :
            return {...state, images: state.images.slice(state.countToDelete)}

        case
        'UPDATE_COUNT'
        :
            return {...state, countToDelete: action.countToDelete}
        default:
            return state;
    }
};

export default reducer