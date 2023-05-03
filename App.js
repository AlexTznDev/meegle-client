import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { enableScreens } from "react-native-screens"; //! tres important pour le buil eas
enableScreens(); //! tres important pour le buil eas avec le package react native screen

import "expo-dev-client"; //! to authentification eas build
import StackNavigator from "./screens/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar backgroundColor="#ff0000" barStyle="light-content" />
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
