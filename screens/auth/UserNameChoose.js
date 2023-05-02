import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserNameChoose = () => {
  return (
    <View
    style={styles.container}
    >
      <Text>UserNameChoose</Text>
    </View>
  )
}

export default UserNameChoose

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
}
})