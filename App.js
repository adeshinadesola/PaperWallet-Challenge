import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './components/Stack.Navigator';


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
