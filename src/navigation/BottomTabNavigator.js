import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

//Icon Imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Screens Imports
import Home from '../screens/Home/Home';
import Camera from '../screens/Camera/Camera';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: 'black',
        },
        activeTintColor: 'white',
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={'home'} size={25} color={color} />
          ),
        }}
        name={'Home'}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={'search'} size={25} color={color} />
          ),
        }}
        name={'Search'}
        component={() => <Text>Search</Text>}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={'add'} size={40} color={color} />
          ),
          tabBarLabel: () => null,
        }}
        name={'Upload'}
        component={Camera}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name={'message-processing'}
              size={25}
              color={color}
            />
          ),
        }}
        name={'Inbox'}
        component={() => <Text>Inbox</Text>}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name={'person'} size={25} color={color} />
          ),
        }}
        name={'Profile'}
        component={() => <Text>Profile</Text>}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
