import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TopBar from "@/shared/ui/TopBar/TopBar";
import { AuthScreen } from "@/screens/auth";
import ROUTER_NAME_SPACES from "@/shared/routes";
import UserProfileStepper from "@/screens/newUserProfile/ui/UserProfileStepper";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTER_NAME_SPACES.LOGIN_ENTRY_POINT.NAME}
          component={AuthScreen}
          options={{
            headerTitle: () => <TopBar />,
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: "white",
              padding: 16,
            },
          }}
        />
        <Stack.Screen
          name={ROUTER_NAME_SPACES.USER_PROFILE.NAME}
          component={UserProfileStepper}
          options={{
            headerTitle: () => <TopBar />,
            headerShadowVisible: false,
            headerBackVisible: false,
            gestureEnabled: false,
            contentStyle: {
              backgroundColor: "white",
              padding: 16,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
