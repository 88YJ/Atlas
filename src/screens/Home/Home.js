import React, {useState, useRef, useEffect} from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';

//Componenets
import Post from '../../components/Post/Post';

//Data
//import posts from '../../../data/posts';
import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';

const Home = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  const onChange = React.useRef((viewableItems) => {
    //console.log(viewableItems.changed[0].index);
    setVisibleIndex(viewableItems.changed[0].index);
  });

  useEffect(() => {
    const fetchPosts = async () => {
      //fetch all posts
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        setPosts(response.data.listPosts.items);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item, index}) => (
          <Post post={item} index={index} visibleIndex={visibleIndex} />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 72}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        removeClippedSubviews={false}
        onViewableItemsChanged={onChange.current}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
      />
    </View>
  );
};

export default Home;
