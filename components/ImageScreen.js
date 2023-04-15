import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageScreen = ({ route }) => {
  // Extracting the photo parameter from the route object
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} resizeMode="contain" />
    </View>
  );
};
// Define the component's styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ImageScreen;

