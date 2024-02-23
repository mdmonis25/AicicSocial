import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, FlatList } from 'react-native';
import { AuthContext } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const SearchScreen = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('https://guflu.in/Social_media/smedia_api.php', {
        route: 'timeline',
        user_id: 2
      });
      if (response.data.result === 1) {
        console.log('API response:', response.data.posts);
        setPosts(response.data.posts);
      } else {
        console.error('API returned an error:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Error response:', error.response); // Log detailed error response
    }
  };


  const renderPost = ({ item }) => (
    <View style={styles.card}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{ uri: item.image_url }} style={styles.avatar} />
        <Text style={styles.username}>{item.username}</Text>
      </View>

      {/* Post Content */}
      <Text style={styles.content}>{item.caption}</Text>

      {/* Image */}
      <Image 
      // source={{ uri: item.postImageUrl }}
       
      style={styles.postImage} />

      {/* Interaction Buttons */}
      <View style={styles.interactionButtons}>
        <TouchableOpacity style={styles.button}>
          <Icon name="thumbs-up-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="chatbox-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>

  );

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Aicic Network</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Icon name="search" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Feed Section */}
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          style={styles.feed}
        />

        <Button
          onPress={() => dispatch({ type: "LOG_OUT" })}
          title="Logout"
          color="blue"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -20,
  },
  postImage: {
    width: '100%',
    height: 200, // Adjust height as needed
    marginTop: 10, // Add margin top to separate from the post content
    borderRadius: 10, // Apply border radius if desired
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  feed: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10,
  },
  interactionButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginRight: 20,
  },
});

export default SearchScreen;