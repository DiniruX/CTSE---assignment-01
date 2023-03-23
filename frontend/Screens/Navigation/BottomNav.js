import { Icon } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import VehicleNavigationStack from "../Components/Vehicle";
import RequestNavigationStack from "../Components/Request";

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: "flex",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          backgroundColor: "black",
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderTopColor: "#D3D3D3",
          borderLeftColor: "#D3D3D3",
          borderRightColor: "#D3D3D3",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Your Vehicles"
        component={VehicleNavigationStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="directions-car"
              color={focused ? "white" : "red"}
              iconStyle={{ marginRight: 10, fontSize: 30 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name=""
        component={RequestNavigationStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="code"
              color={focused ? "#000000" : "#585858"}
              iconStyle={{ marginRight: 10 }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name=""
        component={}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              color={focused ? "#000000" : "#585858"}
              iconStyle={{ marginRight: 10 }}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Request"
        component={}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="collections-bookmark"
              color={focused ? "#000000" : "#585858"}
              iconStyle={{ marginRight: 10 }}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Vehicle"
        component={}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="directions-car"
              color={focused ? "#000000" : "#585858"}
              iconStyle={{ marginRight: 10 }}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Incident"
        component={}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="warning"
              color={focused ? "#000000" : "#585858"}
              iconStyle={{ marginRight: 10 }}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Profile"
        component={}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person"
              color={focused ? "#000000" : "#585858"}
              iconStyle={{ marginRight: 10 }}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
