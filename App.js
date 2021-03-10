/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {createUser} from './src/graphql/mutations';
import {getUser} from './src/graphql/queries';

//RootNavigator
import RootNavigation from './src/navigation/RootNavigation';

const App: () => React$Node = () => {
  useEffect(() => {
    const fetchUser = async () => {
      //get a currently authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      if (!userInfo) {
        return;
      }

      //check is the user already exists
      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, {id: userInfo.attributes.sub}),
      );

      //if it doesnt, create a new user
      if (getUserResponse.data.getUser) {
        console.log('User already exists in DB');
        return;
      }

      const newUser = {
        id: userInfo.attributes.sub,
        username: userInfo.username,
        email: userInfo.attributes.email,
        imageUri:
          'https://i.etsystatic.com/15473007/r/il/ad2941/1729122486/il_570xN.1729122486_62ei.jpg',
      };
      await API.graphql(graphqlOperation(createUser, {input: newUser}));
    };

    fetchUser();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <RootNavigation />
      </SafeAreaView>
    </>
  );
};

export default withAuthenticator(App);
