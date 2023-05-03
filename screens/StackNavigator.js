import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import ProfilMain from "../screens/mainComponent/ProfilMain";
import FindEventMain from "../screens/mainComponent/FindEventMain";
import CreateMain from "../screens/mainComponent/CreateMain";
import EventInfo from "../screens/EventInfo";
import ChatMain from "../screens/mainComponent/ChatMain";
import AuthMain from "../screens/auth/AuthMain";
import NavBar from "../screens/NavBar";

import { useDispatch, useSelector } from "react-redux";

import { selectIsActiveNavigate } from "../slices/navSlice";

import { createStackNavigator } from "@react-navigation/stack";

import useAuth from "../hooks/useAuth";

const Stack = createStackNavigator();
const StackNavigator = () => {
  const { user } = useAuth(); //! context auth
  const [VisibleNavBar, setVisibleNavBar] = useState(false);
  const isActiveNavigate = useSelector(selectIsActiveNavigate);

  useEffect(() => {

    console.log(VisibleNavBar)
    console.log(isActiveNavigate)

    if (isActiveNavigate === "Profil") {
      setVisibleNavBar(true);
    }
    if (isActiveNavigate === "ChatMain") {
      setVisibleNavBar(true);
    }
    if (isActiveNavigate === "FindEvent") {
      setVisibleNavBar(true);
    }
    if (isActiveNavigate === "CreateMain") {
      setVisibleNavBar(false);
    }
    if (isActiveNavigate === "CreateMain2") {
      setVisibleNavBar(true);
    }
    if (isActiveNavigate === "AuthMain") {
      setVisibleNavBar(false);
    }
  }, [isActiveNavigate]);

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="AuthMain"
              component={AuthMain}
              options={{
                headerShown: false,
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="ProfilMain"
              component={ProfilMain}
              options={({ route }) => ({
                headerShown: false,
                animationEnabled: route.params?.shouldAnimate || false,
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="ProfilMain"
              component={ProfilMain}
              options={({ route }) => ({
                headerShown: false,
                animationEnabled: route.params?.shouldAnimate || false,
              })}
            />
            <Stack.Screen
              name="FindEventMain"
              component={FindEventMain}
              options={{
                headerShown: false,
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="CreateMain"
              component={CreateMain}
              options={{
                headerShown: false,
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="EventInfo"
              component={EventInfo}
              options={{
                headerShown: false,
                animationEnabled: true,
              }}
            />
            <Stack.Screen
              name="ChatMain"
              component={ChatMain}
              options={{
                headerShown: false,
                animationEnabled: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>

      {VisibleNavBar && <NavBar />}
    </View>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
