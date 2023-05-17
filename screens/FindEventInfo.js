import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FindEventInfo = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we need to add 1
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();
  return (
    <View style={styles.container}>
      <Text>FindEventInfo</Text>
      <Text>Current Date: {currentDate}</Text>
    </View>
  );
};

export default FindEventInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
