import {  StyleSheet, View } from "react-native";
import React  from "react";
import CreateEvent from "../CreateEvent";
import CreateEventLegende from "../CreateEventLegende";
import MapEvent from "../MapEvent";

import { createStackNavigator } from "@react-navigation/stack";

import AddFriendEvent from "../AddFriendEvent";
import AddDateToEvent from "../AddDateToEvent";
import LocalizationCourtMain from "./LocalizationCourtMain";
import FinalizeEventCreate from "../FinalizeEventCreate";


const CreateMain = () => {
  
  const Stack = createStackNavigator();

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#222222",
        }}
      >
        <Stack.Navigator
          screenOptions={{ headerShown: false, animationEnabled: true }}
        >
          <Stack.Screen name="CreateEvent" component={CreateEvent} />

          <Stack.Screen
            name="CreateEventLegende"
            component={CreateEventLegende}
          />
          <Stack.Screen name="MapEvent" component={MapEvent} />
          <Stack.Screen
            name="LocalizationCourtMain"
            component={LocalizationCourtMain}
          />

          <Stack.Screen name="AddFriendEvent" component={AddFriendEvent} />
          <Stack.Screen name="AddDateToEvent" component={AddDateToEvent} />
          <Stack.Screen name="FinalizeEventCreate" component={FinalizeEventCreate} />
        </Stack.Navigator>
      </View>
    </>
  );
};

export default CreateMain;

const styles = StyleSheet.create({});
