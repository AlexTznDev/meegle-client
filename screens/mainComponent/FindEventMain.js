import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FindEvent from "../FindEvent";

import FindEventInfo from "../FindEventInfo.js";



const FindEventMain = () => {


  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FindEvent />
      <FindEventInfo/>


    </View>
  );
};

export default FindEventMain;

const styles = StyleSheet.create({});
