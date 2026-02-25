import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TopBar from "@/shared/ui/TopBar/TopBar";
import { AuthScreen } from "@/screens/auth";
import { ROUTER_NAME_SPACES } from "@/app/router";
import UserProfileStepper from "@/screens/newUserProfile";
import { View, ActivityIndicator } from "react-native";
import { getAccessToken } from "@/shared/lib/auth";
import { useEffect } from "react";
import { HomeTabs } from "@/widgets";
import { useAuthStore } from "@/shared/lib/authStore";

const Stack = createNativeStackNavigator();

function Navigation() {
  const authStatus = useAuthStore((state) => state.status);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const token = await getAccessToken();

        if (token) {
          setAuthenticated();
        } else {
          setUnauthenticated();
        }
      } catch (error) {
        console.error("Error checking user auth:", error);
        setUnauthenticated();
      }
    };

    checkUserAuth();
  }, [setAuthenticated, setUnauthenticated]);

  if (authStatus === "unknown") {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={authStatus}
        initialRouteName={
          authStatus === "authenticated"
            ? ROUTER_NAME_SPACES.HOME.NAME
            : ROUTER_NAME_SPACES.LOGIN_ENTRY_POINT.NAME
        }
        screenOptions={{ contentStyle: { paddingHorizontal: 0 } }}
      >
        {authStatus === "unauthenticated" ? (
          <Stack.Screen
            name={ROUTER_NAME_SPACES.LOGIN_ENTRY_POINT.NAME}
            component={AuthScreen}
            options={{
              headerTitle: () => <TopBar />,
              headerShadowVisible: false,
              contentStyle: { backgroundColor: "white", padding: 16 },
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
