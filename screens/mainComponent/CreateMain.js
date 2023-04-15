import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreateEvent from '../CreateEvent'


const CreateMain = () => {
  return (
    <View
    style={{
      flex:1
    }}>
   <CreateEvent/>
    </View>
  )
}

export default CreateMain

const styles = StyleSheet.create({})