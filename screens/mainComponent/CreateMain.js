import { SafeAreaView, StyleSheet, View } from "react-native";
import React, {useEffect} from "react";
import CreateEvent from "../CreateEvent";
import UploadImage from "../UploadImage";
import CreateEventLegende from "../CreateEventLegende";

//redux
import { useSelector } from "react-redux";
import { selectEventStep } from "../../slices/navSlice";

const CreateMain = () => {
  const eventStep = useSelector(selectEventStep);



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
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
          }}
        >
          <CreateEventLegende />
        </SafeAreaView>
      )}
    </>
  );
};

export default CreateMain;

const styles = StyleSheet.create({});
