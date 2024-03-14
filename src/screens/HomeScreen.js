import { Button, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import socialApi from '../api/socialApi';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    fetchData();
    console.log("This is state SearchScreen wala:", authState)
  }, [authState]);

  const fetchData = async () => {
    try {
      const response = await socialApi.post('', {
        route: 'timeline',
        user_id: 2
      });
      if (response.data.result === 1) {
        console.log('API response:', response.data.posts);
        setPosts(response.data.posts);
        setComments(response.data.comments);
      } else {
        console.error('API returned an error:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Error response:', error.response); // Log detailed error response
    }
  };

  const handleLikePress = async (postId) => {
    try {
      const response = await socialApi.post('', {
        route: 'like_post',
        post_id: 2,
        user_id: 2 // Assuming you have a user ID, adjust as needed
      });

      if (response.data.success) {
        console.log('Post liked successfully');
        // Update posts state to reflect the change in like status
        const updatedPosts = posts.map(post => {
          if (post.id === postId) {
            return { ...post, is_like: response.data.is_like };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        console.error('Error liking/unliking post:', response.data.message);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };


  const postComment = async () => {
    try {
      const response = await socialApi.post('', {
        route: 'create_comment',
        post_id: 2,
        user_id: 2,
        comment_text: commentText,
      });
      if (response.data.success) {
        console.log('Comment posted successfully');
        fetchData(); // Refresh data after posting comment
        setCommentText(''); // Clear comment input field
      } else {
        console.error('Error posting comment:', response.data.error);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const renderCommentModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* <ScrollView>
            {comments.map(comment => (
              <View key={comment.id} style={styles.chatContainer}>
                <Image source={{ uri: comment.user_avatar }} style={styles.avatar} />
                <View style={styles.chatContent}>
                  <Text style={styles.username}>{comment.user_name}</Text>
                  <Text>{comment.comment_text}</Text>
                </View>
              </View>
            ))}
          </ScrollView> */}
          <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          onChangeText={text => setCommentText(text)}
          value={commentText}
        />
        <Button title="Post Comment" onPress={postComment} />
      </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Icon name="close-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image source={{ uri: `https://guflu.in/Social_media/upload/${item.image_url}` }} style={styles.avatar} />
        <Text style={styles.username}>{item.user_name}</Text>
      </View>
      <Text style={styles.content}>{item.caption}</Text>
      <Image
        source={{ uri: `https://guflu.in/Social_media/upload/${item.image_url}` }}
        style={styles.postImage}
        onError={(error) => console.log('Error loading image', error)}
      />
      <View style={styles.interactionButtons}>
        <TouchableOpacity style={styles.button} onPress={() => handleLikePress(item.id)}>
          {item.is_like == 1 ? <Icon name={ "thumbs-up"} size={24} color={'#0047ab'}/> : <Icon name={ "thumbs-up-outline"} size={24} color={'black'}/>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          setModalVisible(true);
          setPostId(item.id); // Set the post ID for which comments are being viewed
        }}>
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
        <View style={styles.header}>
          <Text style={styles.headerText}> Aicic Network </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { navigation.navigate('SearchScreen') }}>
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 10, marginBottom: 10 }} onPress={() => { navigation.navigate('ChatScreen') }}>
              <Icon name="chatbox" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          style={styles.feed}
        />
        {renderCommentModal()}
      </View>
      {/* Input field for posting comments */}
      {/* <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          onChangeText={text => setCommentText(text)}
          value={commentText}
        />
        <Button title="Post Comment" onPress={postComment} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 12,
    backgroundColor: '#5843F6',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    // backgroundColor: '#fff',
    backgroundColor: '#5843F6',
    borderRadius: 20,
    padding: 5,
    marginBottom: 12
  },
  headerIcons: {
    flexDirection: 'row',
  },
  feed: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ded8f0',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    // color: '#000',
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
    fontSize: 16,
    color: '#000',
  },
  content: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  interactionButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatContent: {
    marginLeft: 10,
  },
  commentInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default HomeScreen;
