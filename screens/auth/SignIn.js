import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setIsActiveNavigate } from "../../slices/navSlice";

import useAuth from "../../hooks/useAuth";

const SignIn = () => {
  const { user, googleSignInRequest, request, signOut } = useAuth();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user)
  
 
  }, [user]);

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Welcome</Text>
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          ></Image>
          <Text>{user.displayName}</Text>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
          >
            <View
              style={{
                marginTop: 20,
                paddingTop: 15,
                paddingBottom: 15,
                backgroundColor: "#FFB25F",
                borderRadius: 10,
                width: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfilMain"),
                  dispatch(setIsActiveNavigate("Profil"));
              }}
            >
              <Text>Profil page</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}

      {user === null && (
        <>
          <View
            style={{
              height: "45%",
              width: "100%",
              marginBottom: 50,
            }}
          >
            <Image
              source={require("../../assets/valenciaImg.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />

            <Image
              style={{
                width: 100,
                height: 50,
                left: "50%",
                transform: [{ translateX: -50 }],
                position: "absolute",
                top: "20%",
              }}
              resizeMode="contain"
              source={require("../../assets/Meegle.png")}
            />
            <Text
              style={{
                position: "absolute",
                fontSize: 40,
                color: "#fff",
                fontWeight: "bold",
                bottom: 40,
                left: 20,
              }}
            >
              Sign In to your Account
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 10,
            }}
          >
            <View
              style={{
                width: "90%",
                gap: 10,
              }}
            >
              <TextInput
                placeholder="Email"
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  borderWidth: 0.5,
                  borderColor: "#00000070",
                  borderRadius: 10,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                  marginBottom: 3,
                }}
              ></TextInput>
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  borderWidth: 0.5,
                  borderColor: "#00000070",
                  borderRadius: 10,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                  marginBottom: 10,
                }}
              ></TextInput>

              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  paddingBottom: 5,
                }}
              >
                <Text style={{ color: "#FFB25F" }}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    backgroundColor: "#FFB25F",
                    borderRadius: 10,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!request}
                onPress={() => {
                  googleSignInRequest();
                }}
              >
                <View
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderWidth: 0.5,
                    borderColor: "#00000070",
                    borderRadius: 10,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Image
                    source={require("../../assets/google.png")}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: "#000000",
                    }}
                  >
                    Sign in with Google
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProfilMain"),
                    dispatch(setIsActiveNavigate("Profil"));
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>Dont't have an account?</Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SignUp");
                    }}
                  >
                    <Text style={{ color: "#FFB25F", marginLeft: 10 }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
