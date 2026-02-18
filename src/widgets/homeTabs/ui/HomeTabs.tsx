import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import { HomeScreen } from "@/screens/home";
import FloatingTabBar from "@/widgets/floatingTabBar";

const Tab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();
const MeetingsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const PlaceholderScreen = ({ title }: { title: string }) => {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderText}>Секция в разработке</Text>
    </View>
  );
};

const FeedStackNavigator = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </FeedStack.Navigator>
  );
};

const MeetingsStackNavigator = () => {
  return (
    <MeetingsStack.Navigator>
      <MeetingsStack.Screen
        name="meetings"
        options={{ title: "Встречи", headerTitleAlign: "center" }}
      >
        {() => <PlaceholderScreen title="Встречи" />}
      </MeetingsStack.Screen>
    </MeetingsStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="profile"
        options={{ title: "Профиль", headerTitleAlign: "center" }}
      >
        {() => <PlaceholderScreen title="Профиль" />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tab.Screen
        name="feed-tab"
        component={FeedStackNavigator}
        options={{ title: "Лента" }}
      />
      <Tab.Screen
        name="meetings-tab"
        component={MeetingsStackNavigator}
        options={{ title: "Встречи" }}
      />
      <Tab.Screen
        name="profile-tab"
        component={ProfileStackNavigator}
        options={{ title: "Профиль" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F5F6F8",
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 15,
    color: "#5A6473",
  },
});

export default HomeTabs;
