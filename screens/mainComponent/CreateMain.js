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




const CreateMain = () => {
  const eventStep = useSelector(selectEventStep);
  const Stack = createStackNavigator();

  

  return (
    <>
      {eventStep === 0 && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#222222",
          }}
        >
          <CreateEvent />
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <UploadImage />
          </View>
        </SafeAreaView>
      )}
      {eventStep === 1 && (

          <Stack.Navigator>
            <Stack.Screen
              name="CreateEventLegende"
              component={CreateEventLegende}
              options={{
                headerShown: false,
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="AddFriendEvent"
              component={AddFriendEvent}
              options={{
                headerShown: false,
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="AddDateToEvent"
              component={AddDateToEvent}
              options={{
                headerShown: false,
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="MapEvent"
              component={MapEvent}
              options={{
                headerShown: false,
                animationEnabled: true,
              }}
            />
          </Stack.Navigator>
        
      )}
    </>
  );
};

export default CreateMain;

const styles = StyleSheet.create({});
