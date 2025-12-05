import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens/home/ui/HomeScreem/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import TopBar from "@/shared/ui/TopBar/TopBar";
import LoginByPhoneNumber from "@/screens/auth/ui/LoginByPhoneNumber/LoginByPhoneNumber";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LoginByPhoneNumber}
          options={{
            headerTitle: () => <TopBar />,
            headerShadowVisible: false,
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
