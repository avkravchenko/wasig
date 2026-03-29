import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@/screens/home";
import { FeedFilterScreen } from "@/screens/feedFilter";
import { ChatsScreen } from "@/screens/chats";
import { MeetingsScreen } from "@/screens/meetings";
import FloatingTabBar from "@/widgets/floatingTabBar";

type FeedStackParamList = {
  home: undefined;
};

const Tab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const FiltersStack = createNativeStackNavigator();
const MeetingsStack = createNativeStackNavigator();

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
        component={MeetingsScreen}
        options={{ headerShown: false }}
      />
    </MeetingsStack.Navigator>
  );
};

const FiltersStackNavigator = () => {
  return (
    <FiltersStack.Navigator>
      <FiltersStack.Screen
        name="filters"
        component={FeedFilterScreen}
        options={{ headerShown: false }}
      />
    </FiltersStack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="home-tab"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tab.Screen
        name="home-tab"
        component={FeedStackNavigator}
        options={{ title: "Лента" }}
      />
      <Tab.Screen
        name="meetings-tab"
        component={MeetingsStackNavigator}
        options={{ title: "Встречи" }}
      />
      <Tab.Screen
        name="filters-tab"
        component={FiltersStackNavigator}
        options={{ title: "Фильтры" }}
      />
      <Tab.Screen
        name="profile-tab"
        component={ChatsScreen}
        options={{ title: "Чаты" }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
