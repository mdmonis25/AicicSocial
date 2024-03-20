import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const PostDetails = ({ route }) => {
  const { imageUrl } = route.params; 

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: Dimensions.get('window').width, // Use window width for full width
    height: Dimensions.get('window').height, // Use window height for full height
  },
});

export default PostDetails;
