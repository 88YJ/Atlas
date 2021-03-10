import React from 'react';

//Nav Bar
import BottomTabNavigator from './BottomTabNavigator';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CreatePost from '../screens/CreatePost/CreatePost';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen
          options={{headerShown: true, title: 'Post'}}
          name="CreatePost"
          component={CreatePost}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
