import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CreateEvent from "../CreateEvent";
import UploadImage from "../UploadImage";

const CreateMain = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#222222",
      }}
    >
      <CreateEvent />
      <UploadImage />
    </SafeAreaView>
  );
};

export default CreateMain;

const styles = StyleSheet.create({});
