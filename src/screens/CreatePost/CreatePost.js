import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {createPost} from '../../graphql/mutations';

import styles from './styles';

const CreatePost = () => {
  const [description, setDesription] = useState('');
  const [videoKey, setVideoKey] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async (imagePath) => {
    try {
      const response = await fetch(imagePath);

      const blob = await response.blob();

      const filename = `${uuidv4()}.mp4`;
      const s3Response = await Storage.put(filename, blob);

      setVideoKey(s3Response.key);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    uploadToStorage(route.params.videoUri);
  }, []);

  const onPublish = async () => {
    if (!videoKey) {
      console.log('video is not uploaded');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        gameID: '427d22f0-246a-4ba4-9cd2-8d3c9b57192f',
      };

      const response = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      navigation.navigate('Home', {screen: 'Home'});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={description}
        onChangeText={setDesription}
        numberOfLines={5}
        placeholder={'Description'}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={onPublish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
