import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ProfilMain from "../screens/mainComponent/ProfilMain";
import FindEventMain from "../screens/mainComponent/FindEventMain";
import CreateMain from "../screens/mainComponent/CreateMain";
import EventInfo from "../screens/EventInfo";
import ChatMain from "../screens/mainComponent/ChatMain";
import AuthMain from "../screens/auth/AuthMain";
import NavBar from "../screens/NavBar";

import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <View style={styles.container}>
    <Stack.Navigator>
    <Stack.Screen
      name="AuthMain"
      component={AuthMain}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />

    <Stack.Screen
      name="ProfilMain"
      component={ProfilMain}
      options={({ route }) => ({
        headerShown: false,
        animationEnabled: route.params?.shouldAnimate || false,
      })}
    />
    <Stack.Screen
      name="FindEventMain"
      component={FindEventMain}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />
    <Stack.Screen
      name="CreateMain"
      component={CreateMain}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />
    <Stack.Screen
      name="EventInfo"
      component={EventInfo}
      options={{
        headerShown: false,
        animationEnabled: true,
      }}
    />
    <Stack.Screen
      name="ChatMain"
      component={ChatMain}
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
    />
  </Stack.Navigator>

  <NavBar />

</View>

  )
}

export default StackNavigator

const styles = StyleSheet.create({  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },}) 