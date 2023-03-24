import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "./UserManagement/UserProfile";
import UpdateUser from "./UserManagement/UpdateUser";
import ViewAllUser from "./UserManagement/ViewAllUser";
import AddAdmin from "./UserManagement/AddAdmin";

const UserListNavigationStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserList" component={ViewAllUser} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="AddAdmin" component={AddAdmin} />
    </Stack.Navigator>
  );
};

export default UserListNavigationStack;
