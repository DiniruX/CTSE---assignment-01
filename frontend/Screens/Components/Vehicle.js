import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddVehicle from "./VehicleManagement/AddVehicle";
import UpdateVehicle from "./VehicleManagement/UpdateVehicle";
import UserVehicles from "./VehicleManagement/UserVehicles";

const VehicleNavigationStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserVehicles" component={UserVehicles} />
      <Stack.Screen name="AddVehicle" component={AddVehicle} />
      <Stack.Screen name="UpdateVehicle" component={UpdateVehicle} />
    </Stack.Navigator>
  );
};

export default VehicleNavigationStack;