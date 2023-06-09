import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./UserManagement/auth/Login";
// import Login from "./UserManagement/UserProfile";
import Register from "./UserManagement/auth/Register";

const AuthNavigationStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
