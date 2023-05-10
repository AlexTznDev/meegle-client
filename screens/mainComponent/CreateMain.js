import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import CreateEvent from "../CreateEvent";
import UploadImage from "../UploadImage";
import CreateEventLegende from "../CreateEventLegende";
import MapEvent from "../MapEvent";

import { createStackNavigator } from "@react-navigation/stack";

//redux
import { useSelector } from "react-redux";
import { selectEventStep } from "../../slices/navSlice";
import AddFriendEvent from "../AddFriendEvent";
import AddDateToEvent from "../AddDateToEvent";
import LocalizationCourtMain from "./LocalizationCourtMain";

const CreateMain = () => {
  const eventStep = useSelector(selectEventStep);
  const Stack = createStackNavigator();



  return (
    <>
      {eventStep === 0 && (
        <View
          style={{
            flex: 1,
            backgroundColor: "#222222",
          }}
        >
          <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
            <Stack.Screen name="CreateEvent" component={CreateEvent} />
            <Stack.Screen
              name="LocalizationCourtMain"
              component={LocalizationCourtMain}
            />
          </Stack.Navigator>
        </View>
      )}
      {eventStep === 1 && (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
            <Stack.Screen
              name="CreateEventLegende"
              component={CreateEventLegende}
            />
            <Stack.Screen name="AddFriendEvent" component={AddFriendEvent} />
            <Stack.Screen name="AddDateToEvent" component={AddDateToEvent} />
            <Stack.Screen name="MapEvent" component={MapEvent} />
          </Stack.Navigator>
        </View>
      )}
    </>
  );
};

export default CreateMain;

const styles = StyleSheet.create({});
