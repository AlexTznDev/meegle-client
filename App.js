import { StyleSheet, View, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";


import { enableScreens } from "react-native-screens";//! tres important pour le buil eas
enableScreens()    //! tres important pour le buil eas avec le package react native screen


import NavBar from "./screens/NavBar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfilMain from "./screens/mainComponent/ProfilMain";
import FindEventMain from "./screens/mainComponent/FindEventMain";
import CreateMain from "./screens/mainComponent/CreateMain";
import EventInfo from "./screens/EventInfo";
import ChatMain from "./screens/mainComponent/ChatMain";
import SignIn from "./screens/auth/SignIn"

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


import "expo-dev-client"//! to authentification eas build


export default function App() {


  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Provider store={store}>



          
            <StatusBar backgroundColor="#ff0000" barStyle="light-content" />
            

            <Stack.Navigator>

            <Stack.Screen
                name="SignIn"
                component={SignIn}
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
            </Stack.Navigator>

            <NavBar />
            
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
