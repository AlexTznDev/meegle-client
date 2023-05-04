import { StyleSheet} from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../../screens/auth/SignIn"
import SignUp from "../../screens/auth/SignUp"
import UserNameChoose from "../../screens/auth/UserNameChoose"
import GenreChoose from "./GenreChoose";
import PictureChoose from "./PictureChoose";
const AuthMain = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator>
      
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="UserNameChoose"
          component={UserNameChoose}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="GenreChoose"
          component={GenreChoose}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="PictureChoose"
          component={PictureChoose}
          options={{
            headerShown: false,
            animationEnabled: true,
          }}
        />

      </Stack.Navigator>
    </>
  );
};

export default AuthMain;

const styles = StyleSheet.create({});
