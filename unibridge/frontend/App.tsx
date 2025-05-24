// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen'; // Example screen, you can replace with actual content
import ExploreScreen from './src/screens/ExploreScreen'; // Example screen
import InternshipScreen from './src/screens/InternshipsScreen'; // Example screen
import ProjectScreen from './src/screens/ProjectsScreen'; // Correct import for ProjectScreen
import HackathonScreen from './src/screens/HackathonsScreen'; // Example screen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="InternshipScreen" component={InternshipScreen} />
        <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
        <Stack.Screen name="HackathonScreen" component={HackathonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
