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
      <Image source={{ uri: item.postImageUrl }} style={styles.postImage} />

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


// import React, { useContext } from 'react';
// import { SEARCH_ALL, SEARCH_HOTELS, SEARCH_PLACES } from '../data';
// import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
// import { AuthContext } from '../../App';
// import SearchMasonry from '../components/Search/SearchMasonry';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';



// const tabs = [
//   {
//     title: 'All',
//     content: () => <SearchMasonry key="all" list={SEARCH_ALL} />,
//   },
//   {
//     title: 'Places',
//     content: () => <SearchMasonry key="places" list={SEARCH_PLACES} />,
//   },
//   {
//     title: 'Hotels',
//     content: () => <SearchMasonry key="hotels" list={SEARCH_HOTELS} />,
//   },
// ];

// const SearchScreen = () => {

//   const { state, dispatch } = useContext(AuthContext);
//   const dummyData = [
//     {
//       id: 1,
//       userAvatar: require('../../assets/images/hotels/cb-1.jpeg'), // Assuming avatar images are stored in assets folder
//       username: 'Md Monis',
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       timestamp: '2 hours ago',
//       image: require('../../assets/images/hotels/ac-2.jpeg')
//     },
//     {
//       id: 2,
//       userAvatar: require('../../assets/images/hotels/cb-1.jpeg'),
//       username: 'Ambarish',
//       content: 'Sir Salary Badha do Mera, Warna doosra aadmi dhundh lo.',
//       timestamp: '3 hours ago',
//       image: require('../../assets/images/hotels/ac-1.jpeg')
//     },
//     {
//       id: 3,
//       userAvatar: require('../../assets/images/hotels/cb-1.jpeg'),
//       username: 'Shivam',
//       content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       timestamp: '3 hours ago',
//       image: require('../../assets/images/hotels/ac-1.jpeg')
//     },
//     {
//       id: 4,
//       userAvatar: require('../../assets/images/hotels/cb-1.jpeg'),
//       username: 'Shahrukh Khan',
//       content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       timestamp: '3 hours ago',
//       image: require('../../assets/images/hotels/ac-1.jpeg')
//     },
//     {
//       id: 5,
//       userAvatar: require('../../assets/images/hotels/cb-1.jpeg'),
//       username: 'Salman Khan',
//       content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       timestamp: '3 hours ago',
//       image: require('../../assets/images/hotels/ac-1.jpeg')
//     },
//   ];
//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1 }}>

//         {/* Header Section */}
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 }}>
//           <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Aicic Network</Text>
//           <View style={{ flexDirection: 'row' }}>
//             <TouchableOpacity style={{ marginRight: 20 }}>
//               <Icon name="search" size={24} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Icon name="add-circle-outline" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Feed Section */}
//         <ScrollView style={{ flex: 1, marginTop: 20 }}>
//           {dummyData.map((post, index) => (
//             <View key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 20 }}>
//               {/* User Info */}
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Image source={post.userAvatar} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
//                 <Text style={{ fontWeight: 'bold' }}>{post.username}</Text>
//               </View>

//               {/* Post Content */}
//               <Text style={{ marginTop: 10 }}>{post.content}</Text>

//               {/* Interaction Buttons */}
//               <View style={{ flexDirection: 'row', marginTop: 10 }}>
//                 <TouchableOpacity style={{ marginRight: 20 }}>
//                   <Icon name="heart-outline" size={24} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ marginRight: 20 }}>
//                   <Icon name="chatbubble-outline" size={24} color="black" />
//                 </TouchableOpacity>
//                 <TouchableOpacity>
//                   <Icon name="share-social-outline" size={24} color="black" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//           <Button
//             onPress={() => dispatch({ type: "LOG_OUT" })}
//             title="Logout"
//             color="blue"
//             accessibilityLabel="Learn more about this purple button"
//           />

//       </View>
//       {/* <Tabs items={tabs} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
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
//   },
//   content: {
//     marginTop: 10,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginTop: 10,
//     resizeMode: 'cover',
//   },
//   interactionButtons: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   button: {
//     marginRight: 20,
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingBottom: 20,
//   },
// });

// export default SearchScreen;

