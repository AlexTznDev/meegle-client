import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import { useSelector } from "react-redux";
import { selectIsActiveNavigate } from "../slices/navSlice";

const EventInfo = ({ navigation }) => {
  console.log(navigation.goBack);
  const isActiveNavigate = useSelector(selectIsActiveNavigate);

  const onGestureEvent = ({ nativeEvent }) => {
    const { translationX } = nativeEvent;
    if (translationX > 100) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>EventInfo Screen</Text>
      </View>
    </PanGestureHandler>
  );
};

export default EventInfo;

const styles = StyleSheet.create({});
