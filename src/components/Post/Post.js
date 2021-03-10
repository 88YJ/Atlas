import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Storage} from 'aws-amplify';
import Video from 'react-native-video';
import styles from './styles';

//Icon Imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const [paused, setPaused] = useState(true);
  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  useEffect(() => {
    if (props.visibleIndex === props.index) {
      setPaused(false);
    } else {
      setPaused(true);
    }
    //console.log('it ran' + props.index + props.visibleIndex);
  }, [props.visibleIndex, props.index]);

  const onUpVote = () => {
    const votesToAdd = isUpVoted ? -1 : isDownVoted ? 2 : 1;
    setPost({
      ...post,
      votes: post.votes + votesToAdd,
    });
    setIsDownVoted(false);
    setIsUpVoted(!isUpVoted);
  };

  const onDownVote = () => {
    const votesToAdd = isDownVoted ? -1 : isUpVoted ? 2 : 1;
    setPost({
      ...post,
      votes: post.votes - votesToAdd,
    });
    setIsUpVoted(false);
    setIsDownVoted(!isDownVoted);
  };

  const getVideoUri = async () => {
    if (post.videoUri.startsWith('http')) {
      setVideoUri(post.videoUri);
      return;
    }
    setVideoUri(await Storage.get(post.videoUri));
  };

  useEffect(() => {
    getVideoUri();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <Video
          source={{uri: videoUri}}
          style={styles.video}
          resizeMode={'cover'}
          repeat={true}
          paused={paused}
        />
      </TouchableWithoutFeedback>

      <View style={styles.uiContainer}>
        <View style={styles.rightContainer}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: post.user.imageUri,
            }}
          />

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onUpVote}>
              <MaterialCommunityIcons
                name={'gamepad-circle-up'}
                size={40}
                color={isUpVoted ? 'blue' : 'white'}
              />
            </TouchableOpacity>

            <Text style={styles.statsLabel}>{post.votes}</Text>

            <TouchableOpacity onPress={onDownVote}>
              <MaterialCommunityIcons
                name={'gamepad-circle-down'}
                size={40}
                color={isDownVoted ? 'red' : 'white'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesome name={'commenting-o'} size={35} color="white" />
            <Text style={styles.statsLabel}>{post.comments}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name={'arrow-redo-outline'} size={35} color="white" />
            <Text style={styles.statsLabel}>{post.shares}</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.handle}>@{post.user.username}</Text>
          <Text style={styles.description}>{post.description}</Text>

          <View style={styles.gameRow}>
            <Image
              style={styles.gamePicture}
              source={{
                uri: post.game.imageUri,
              }}
            />
            <Text style={styles.gameName}>{post.game.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;
