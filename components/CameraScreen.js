import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Camera } from 'expo-camera';
import { saveToGallery } from '../helpers/gallery';


const CameraScreen = ({ navigation }) => {
  // State variables for camera permissions, camera reference, camera type, and the captured photo
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Function to handle capturing a photo
  const handleCapture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedPhoto(photo);
    }
  };
  // Function to handle saving the captured photo to the device's gallery and navigating to the gallery screen
  const handleSave = async () => {
    if (capturedPhoto) {
      await saveToGallery(capturedPhoto.uri);
      navigation.navigate('GalleryScreen', { photo: capturedPhoto });
    }
  };
  // Function to handle cancelling the captured photo
  const handleCancel = () => {
    setCapturedPhoto(null);
  };
  // Function to handle double-tapping the camera screen to switch the camera type
  const handleDoubleTap = () => {
    console.log('Type before switch:', type);
    if (cameraRef) {
      setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    }
    console.log('Type after switch:', type);
  };

  // If camera permissions are still being requested, render an empty view
  if (hasPermission === null) {
    return <View />;
  }
  // If camera permissions have been denied, render text indicating that the user has no access to the camera
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // If a photo has been captured, render a preview of the photo with buttons to save or cancel
  if (capturedPhoto) {
    return (
      <View style={styles.preview}>
        <Image source={{ uri: capturedPhoto.uri }} style={styles.previewImage} />
        <View style={styles.previewButtons}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  // If no photo has been captured, render the camera view with a capture button and double-tap to switch camera type
  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ref={ref => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCapture}>
              <Text style={styles.buttonText}>Capture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </TouchableWithoutFeedback>
  );
};
// Define the component's styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CameraScreen;