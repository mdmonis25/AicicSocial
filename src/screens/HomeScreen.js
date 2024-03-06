// import { Button, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../App';
// import Icon from 'react-native-vector-icons/Ionicons';
// import socialApi from '../api/socialApi';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const HomeScreen = () => {
//   const { authState, authDispatch } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     fetchData();
//     console.log("This is state SearchScreeen wala:", authState)
//   }, [authState]);

//   const fetchData = async () => {
//     try {
//       const response = await socialApi.post('', {
//         route: 'timeline',
//         user_id: 2
//       })
//       if (response.data.result === 1) {
//         console.log('API response:', response.data.posts);
//         setPosts(response.data.posts);
//       } else {
//         console.error('API returned an error:', response.data.error);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       console.error('Error response:', error.response); // Log detailed error response
//     }
//   };

//   const handleLikePress = async (postId) => {
//     try {
//       const postToUpdate = posts.find(post => post.id === postId);
//       const isLiked = postToUpdate.is_like === 1;

//       if (isLiked) {
//         // If already liked, do nothing
//         return;
//       }

//       const route = isLiked ? 'unlike_post' : 'like_post';

//       const response = await socialApi.post('', {
//         route: route,
//         post_id: 2,
//         user_id: 2,
//       });

//       if (response.data.success) {
//         console.log('Post action performed successfully');
//         const updatedPosts = posts.map(post => {
//           if (post.id === 2) {
//             return { ...post, is_like: isLiked ? 0 : 1 };
//           }
//           return post;
//         });
//         setPosts(updatedPosts);
//       } else {
//         console.error('Error performing action on post:', response.data.error);
//       }
//     } catch (error) {
//       console.error('Error performing action on post:', error);
//     }
//   };

//   const renderCommentModal = () => (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={modalVisible}
//       onRequestClose={() => {
//         setModalVisible(false);
//       }}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <ScrollView>
//             {/* Display comments here */}
//             {/* Example: */}
//             <Text>Comment 1</Text>
//             <Text>Comment 2</Text>
//             <Text>Comment 3</Text>
//             {/* Replace with actual comment data */}
//           </ScrollView>
//           <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//             <Icon name="close-circle-outline" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
//   const renderPost = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.userInfo}>
//         <Image source={{ uri: `https://guflu.in/Social_media/upload/${item.image_url}` }} style={styles.avatar} />
//         <Text style={styles.username}>{item.user_name}</Text>
//       </View>
//       <Text style={styles.content}>{item.caption}</Text>
//       <Image
//         source={{ uri: `https://guflu.in/Social_media/upload/${item.image_url}` }}
//         style={styles.postImage}
//         onError={(error) => console.log('Error loading image', error)}
//       />
//       <View style={styles.interactionButtons}>
//         <TouchableOpacity style={styles.button} onPress={() => handleLikePress(item.id)}>
//           <Icon name="thumbs-up" size={24} color={item.is_like === 1 ? "red" : "black"} />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}  onPress={() => setModalVisible(true)}>
//           <Icon name="chatbox-outline" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Icon name="share-outline" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={[styles.container]}>
//       <View style={{ flex: 1 }}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}> Aicic Social Media </Text>
//           <View style={styles.headerIcons}>
//             <TouchableOpacity style={{ marginRight: 20 }} onPress={()=>{navigation.navigate('SearchScreen')}}>
//               <Icon name="search" size={24} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => { navigation.navigate('ChatScreen') }}>
//               <Icon name="add-circle-outline" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <FlatList
//           data={posts}
//           renderItem={renderPost}
//           keyExtractor={(item) => item.id.toString()}
//           style={styles.feed}
//         />
//         {renderCommentModal()}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EFF3FC',
//     marginTop: 0,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     marginTop: 10,
//     borderRadius: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   headerText: {
//     fontSize: 18,
//     color: '#7F27FF',
//     fontWeight: 'bold',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 10
//   },
//   headerIcons: {
//     flexDirection: 'row',
//   },
//   feed: {
//     flex: 1,
//     marginTop: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     marginBottom: 20,
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   username: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#7F27FF',
//   },
//   content: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#000',
//   },
//   interactionButtons: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   button: {
//     marginRight: 20,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     maxHeight: '80%',
//     width: '90%',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
// });

// export default HomeScreen;

import { Button, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import socialApi from '../api/socialApi';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
    console.log("This is state SearchScreen wala:", authState)
  }, [authState]);

  const fetchData = async () => {
    try {
      const response = await socialApi.post('', {
        route: 'timeline',
        user_id: 2
      })
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

  const handleLikePress = async (postId) => {
    try {
      const postToUpdate = posts.find(post => post.id === postId);
      const isLiked = postToUpdate.is_like === 1;

      if (isLiked) {
        // If already liked, do nothing
        return;
      }

      const route = isLiked ? 'unlike_post' : 'like_post';

      const response = await socialApi.post('', {
        route: route,
        post_id: 2,
        user_id: 2,
      });

      if (response.data.success) {
        console.log('Post action performed successfully');
        const updatedPosts = posts.map(post => {
          if (post.id === 2) {
            return { ...post, is_like: isLiked ? 0 : 1 };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        console.error('Error performing action on post:', response.data.error);
      }
    } catch (error) {
      console.error('Error performing action on post:', error);
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
          <ScrollView>
            {/* Display comments here */}
            {/* Example: */}
            <View style={styles.chatContainer}>
              <Image source={require('../../assets/images/users/35.jpeg')} style={styles.avatar} />
              <View style={styles.chatContent}>
                <Text style={styles.username}>Md Monis</Text>
                <Text>Comment 1</Text>
              </View>
            </View>
            <View style={styles.chatContainer}>
              <Image source={require('../../assets/images/users/35.jpeg')} style={styles.avatar} />
              <View style={styles.chatContent}>
                <Text style={styles.username}>Ambarish Sharma</Text>
                <Text>Comment 2</Text>
              </View>
            </View>
            <View style={styles.chatContainer}>
              <Image source={require('../../assets/images/users/35.jpeg')} style={styles.avatar} />
              <View style={styles.chatContent}>
                <Text style={styles.username}>Shivam Gupta</Text>
                <Text>Comment 1</Text>
              </View>
            </View>
            <View style={styles.chatContainer}>
              {/* <Image source={{ uri: "../../assets/images/users/35.jpeg" }} style={styles.avatar} /> */}
              <Image source={require('../../assets/images/users/35.jpeg')} style={styles.avatar} />
              <View style={styles.chatContent}>
                <Text style={styles.username}>Prabhat Kumar</Text>
                <Text>Comment 2</Text>
              </View>
            </View>
            {/* Replace with actual comment data */}
          </ScrollView>
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
          <Icon name="thumbs-up" size={24} color={item.is_like === 1 ? "red" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={() => setModalVisible(true)}>
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
          <Text style={styles.headerText}> Aicic Social Media </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={()=>{navigation.navigate('SearchScreen')}}>
              <Icon name="search" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ChatScreen') }}>
              <Icon name="add-circle-outline" size={24} color="black" />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF3FC',
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    color: '#7F27FF',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10
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
    fontSize: 16,
    color: '#7F27FF',
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
});

export default HomeScreen;
