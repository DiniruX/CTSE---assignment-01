import { Icon } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import VehicleNavigationStack from "../Components/Vehicle";
import AuthNavigationStack from "../Components/Auth";
import AuthContext from "../Context/UserDetailsContext";
import { useContext } from "react";
import UserNavigationStack from "../Components/User";
import { TouchableOpacity } from "react-native";
import UserListNavigationStack from "../Components/UserList";

const Tabs = () => {
  const authContext = useContext(AuthContext);

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
          backgroundColor: "white",
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
      {authContext.userId != null ? (
        <>
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
          {authContext.userType == "Admin" ? (
            <Tab.Screen
              name="Admin"
              component={UserListNavigationStack}
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
          ) : null}
          <Tab.Screen
            name="User"
            component={UserNavigationStack}
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
            name="Logout"
            component={UserNavigationStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="directions-car"
                  color={focused ? "white" : "red"}
                  iconStyle={{ marginRight: 10, fontSize: 30 }}
                />
              ),
              tabBarButton: ({ onPress }) => (
                <TouchableOpacity
                  onPress={() => {
                    onPress();
                    authContext.logout();
                  }}
                >
                  <Icon
                    name="code"
                    color={"#000000"}
                    iconStyle={{ margin: 20 }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Auth"
          component={AuthNavigationStack}
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
      )}
    </Tab.Navigator>
  );
};

export default Tabs;
