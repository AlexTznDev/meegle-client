import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'

const ChatMain = () => {
  return (


    <SafeAreaView style={styles.container}>
      <Text>ChatMain</Text>
    </SafeAreaView>
  )
}

export default ChatMain

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        flex: 1
    }
})