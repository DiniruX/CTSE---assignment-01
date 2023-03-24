import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "./UserManagement/UserProfile";
import UpdateUser from "./UserManagement/UpdateUser";

const UserNavigationStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
    </Stack.Navigator>
  );
};

export default UserNavigationStack;
