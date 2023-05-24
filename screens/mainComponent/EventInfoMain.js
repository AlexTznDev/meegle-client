import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EventInfo from "../EventInfo";
import EventInfoDataRender from "../EventInfoDataRender";
import EventInfoDiscusion from "../EventInfoDiscusion";
import { useRoute } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const EventInfoMain = () => {
  const Stack = createStackNavigator();

  const route = useRoute();
  const _id = route.params._id;


// console.log(_id)

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <EventInfo />


      <Stack.Navigator >
        <Stack.Screen
          name="EventInfoDataRender"
          children={()=><EventInfoDataRender _id={_id}/>}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="EventInfoDiscusion"
          children={()=><EventInfoDiscusion _id={_id}/>}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default EventInfoMain;

const styles = StyleSheet.create({});
