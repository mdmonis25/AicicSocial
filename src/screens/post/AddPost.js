import { StyleSheet, Text, View } from 'react-native'

import React from 'react'

export default function AddPost() {
  return (
    <View>
      <Text style={styles.text}>AddPost</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize: 20,
    color: "#7F27FF",

  }
})