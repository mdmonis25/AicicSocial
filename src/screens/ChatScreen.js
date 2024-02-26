import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Assuming you have a WebSocket connection implementation here
// Replace 'YourWebSocketClient' with your WebSocket client implementation
import YourWebSocketClient from './YourWebSocketClient';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [slideAnim] = useState(new Animated.Value(-1000)); // Initial position for slide animation

  useEffect(() => {
    // Slide animation when component mounts
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Establish WebSocket connection
    const socket = new YourWebSocketClient('ws://your-websocket-url');

    socket.on('open', () => {
      console.log('WebSocket connected');
    });

    socket.on('message', (msg) => {
      console.log('Received message:', msg);
      // Handle received message
      setMessage(msg);
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      // Close WebSocket connection when component unmounts
      socket.close();
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Title</Text>
        <Icon name="ellipsis-vertical" size={24} color="#555" />
      </View>
      
      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        {/* Render chat messages here */}
        <Text>{message}</Text>
      </View>
      
      {/* Input area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
    // Implement your chat message rendering styles here
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatScreen;
