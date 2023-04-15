import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSnapshot } from 'valtio';
import store from '../helpers/store';

const GalleryScreen = () => {
  // Define state variables for the component
  const [photos, setPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // Check if the screen is currently focused using a hook provided by React Navigation
  const isFocused = useIsFocused();
  // Use Valtio to get the saved photos from the global store
  const { savedPhotos } = useSnapshot(store);
  // Get the navigation object to use in the component
  const navigation = useNavigation();

  useEffect(() => {

    // Define an async function to fetch photos from the device
    const fetchPhotos = async () => {
      try {
        // Get up to 1000 photos from the device at once
        const { assets } = await MediaLibrary.getAssetsAsync({
          mediaType: 'photo',
          sortBy: ['creationTime'],
          first: 1000,
        });
        // Sort the photos by creation time and add a sequence number to each photo
        const sortedAssets = assets.sort((a, b) => b.creationTime - a.creationTime).map((asset, index) => ({
          ...asset,
          sequenceNumber: index,
        }));
        // Update the state with the sorted photos
        setPhotos(sortedAssets);
      } catch (error) {
        console.log('Error fetching photos:', error);
      }
    };
    // Fetch photos when the screen is focused
    if (isFocused) {
      fetchPhotos();
    }
  }, [isFocused]);

  // Define a function to render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(item.uri);
          setModalVisible(true);
        }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.uri }} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  };
  // Return the component's JSX
  return (
    <View style={styles.container}>
      {photos.length === 0 ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={3}
        />
      )}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Back</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
};

// Define the component's styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 0,

  },
  imageContainer: {
    padding: 6,
    margin: 0,
  },
  image: {
    height: 100,
    width: 100,
  },
  modalContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalImage: {
    height: '90%',
    width: '100%',
  },
  closeText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
  },
});

export default GalleryScreen;
