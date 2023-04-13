import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profil from '../Profil'
import EventProfil from '../EventProfil'


const ProfilMain = () => {
  return (
    <View
    style={{
      flex:1
    }}>
          <Profil /> 
          <EventProfil />
    </View>
  )
}

export default ProfilMain

const styles = StyleSheet.create({})