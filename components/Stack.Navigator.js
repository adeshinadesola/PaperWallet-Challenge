import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import GalleryScreen from '../components/GalleryScreen';
import CameraScreen from '../components/CameraScreen';
import ImageScreen from '../components/ImageScreen';

// Create a stack navigator
const Stack = createStackNavigator();

// Define the screens and their order in the stack navigator
export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Image" component={ImageScreen} />
    </Stack.Navigator>
  );
}
