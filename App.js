import { StyleSheet, View, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";

import NavBar from "./screens/NavBar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfilMain from "./screens/mainComponent/ProfilMain";
import FindEventMain from "./screens/mainComponent/FindEventMain";
import CreateMain from "./screens/mainComponent/CreateMain";
import EventInfo from "./screens/EventInfo";
import ChatMain from "./screens/mainComponent/ChatMain";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


import "expo-dev-client"//! to authentification eas build

//ios   :    1014731523069-46q5a8689krdt10mmbnafa5lcnnn1af9.apps.googleusercontent.com
//android : 1014731523069-9ilas3r1shkv09ieu3osforca7sevrgv.apps.googleusercontent.com



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
