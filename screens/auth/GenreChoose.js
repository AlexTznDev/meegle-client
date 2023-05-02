import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GenreChoose = () => {
  return (
    <View
    style={styles.container}
    >
      <Text>GenreChoose</Text>
    </View>
  )
}

export default GenreChoose

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
}})