import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FindEvent from "../FindEvent";
import FindEventInfo from "../FindEventInfo.js";
import MeegleGames from "../MeegleGames";

import { createStackNavigator } from "@react-navigation/stack";

const FindEventMain = () => {
  const Stack = createStackNavigator();

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <FindEvent />

      <Stack.Navigator>
        <Stack.Screen
          name="FindEventInfo"
          component={FindEventInfo}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="MeegleGames"
          component={MeegleGames}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default FindEventMain;

const styles = StyleSheet.create({});
