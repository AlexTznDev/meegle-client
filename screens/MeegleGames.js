import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MeegleGames = () => {
  return (
    <View style={styles.container}>
      <Text>MeegleGames</Text>
    </View>
  );
};

export default MeegleGames;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
