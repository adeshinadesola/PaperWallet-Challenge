import * as MediaLibrary from 'expo-media-library';

export const saveToGallery = async (uri) => {
    try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('PaperWallet', asset, false);
        alert('Image saved to gallery!');
    } catch (error) {
        alert('An error occurred while saving the image to the gallery.');
        console.error(error);
    }
};
