import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const ChatMain = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ChatMain</Text>
    </SafeAreaView>
  );
};

export default ChatMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
