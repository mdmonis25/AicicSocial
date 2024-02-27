import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, View,Button, StyleSheet} from 'react-native';
const FavoriteScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
          style={[styles.button]}
          onPress={()=>{navigation.navigate('LoginScreen')}}
          title="Logout"
          color="blue"
          accessibilityLabel="Learn more about this purple button"
        />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5D4FF',
    marginTop: 0,
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
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    color: '#7F27FF',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding : 10
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
});

export default FavoriteScreen;
