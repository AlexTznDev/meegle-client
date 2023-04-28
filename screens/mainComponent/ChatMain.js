import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";


//! 3 keys to change on .ENV

WebBrowser.maybeCompleteAuthSession();

const ChatMain = () => {
  const [accessToken, setAccesToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "621288007374-msitiqg7s0tg0tgbvkmlif4tdf4nu0bp.apps.googleusercontent.com",
    iosClientId:
      "621288007374-qabpj251e7v19q99ae69hjd5t7qelbto.apps.googleusercontent.com",
    androidClientId:
      "621288007374-me0i12d32gahc298191r7vv0rda2gqiv.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success" && response?.authentication) {
      console.log(response.authentication.accessToken);
      setAccesToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Welcome</Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          ></Image>
          <Text>{user.name}</Text>
          <View>
          </View>

        </View>
      );
    }
  };



  const fetchUserInfo = async () => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = await response.json();
    setUser(userInfo);
  };

  return (
    <SafeAreaView style={styles.container}>
      {user && <ShowUserInfo />}

      {user === null && (
        <>
          <View style={{ justifyContent: "center", alignItems: "center" , width:"100%", gap:10}}>
            <Text>Signup</Text>

            <View
            style={{
              width: "90%"
            }}
            >

            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <View
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  backgroundColor: "#FFB25F",
                  borderRadius: 10,
                  width:"100%",
                  justifyContent:"center",
                  alignItems:"center"
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Button
                </Text>
              </View>
            </TouchableOpacity>
            </View>

          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ChatMain;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
