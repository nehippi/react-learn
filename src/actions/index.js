export const addImages = (data) => ({type: 'ADD', data: data})
export const deleteImage = () => ({type: 'DELETE'})
export const updateCountToDelete = (countToDelete) => ({type: 'UPDATE_COUNT', countToDelete: countToDelete})