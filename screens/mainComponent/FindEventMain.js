import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FindEvent from "../FindEvent";
import FindEventResult from "../FindEventResult";
import EventProfil from "../EventProfil";

const FindEventMain = () => {
  return (
    <View
    style={{
      flex:1
    }}>
      <FindEvent />
      <EventProfil/>
    </View>
  );
};

export default FindEventMain;

const styles = StyleSheet.create({});