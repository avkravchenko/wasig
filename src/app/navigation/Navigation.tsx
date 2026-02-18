import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TopBar from "@/shared/ui/TopBar/TopBar";
import { AuthScreen } from "@/screens/auth";
import { ROUTER_NAME_SPACES } from "@/app/router";
import UserProfileStepper from "@/screens/newUserProfile";
import { View, ActivityIndicator } from "react-native";
import { getAccessToken } from "@/shared/lib/auth";
import { useEffect, useState } from "react";
import { HomeTabs } from "@/widgets";

const Stack = createNativeStackNavigator();

function Navigation() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserAuth = async () => {
    setIsLoading(true);

    try {
      const token = await getAccessToken();
      setToken(token);
    } catch (error) {
      console.error("Error checking user auth:", error);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          token == null
            ? ROUTER_NAME_SPACES.LOGIN_ENTRY_POINT.NAME
            : ROUTER_NAME_SPACES.HOME.NAME
        }
        screenOptions={{ contentStyle: { paddingHorizontal: 0 } }}
      >
        <Stack.Screen
          name={ROUTER_NAME_SPACES.LOGIN_ENTRY_POINT.NAME}
          component={AuthScreen}
          options={{
            headerTitle: () => <TopBar />,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: "white", padding: 16 },
          }}
        />
        <Stack.Screen
          name={ROUTER_NAME_SPACES.HOME.NAME}
          component={HomeTabs}
          options={{
            headerShown: false,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: "#F5F6F8" },
          }}
        />
        <Stack.Screen
          name={ROUTER_NAME_SPACES.USER_PROFILE.NAME}
          component={UserProfileStepper}
          options={{
            headerTitle: () => <TopBar />,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: "white", padding: 16 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
