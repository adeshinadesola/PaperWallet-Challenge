import { proxy } from "valtio";
// Valtio store
const store = proxy({
    savedPhotos: [], // Array to store saved photos
    addPhoto(photo) { // Method to add a new photo to the array
        store.savedPhotos.push(photo);
    },
});

export default store; // Export the store as a default module
