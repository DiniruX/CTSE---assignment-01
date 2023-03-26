import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddIncident from "./IncidentManagement/AddIncident";
import UpdateIncident from "./IncidentManagement/UpdateIncident";
import viewIncident from "./IncidentManagement/viewIncident";
import ViewAllIncidents from "./IncidentManagement/viewAllIncidents";
import AddAction from "./IncidentManagement/addAction";
import UpdateAction from "./IncidentManagement/updateAction";
import Incident from "./IncidentManagement/Incident";
import ViewReport from "./IncidentManagement/ViewReport";

export default function RequestNavigationStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddIncident" component={AddIncident} />
      <Stack.Screen name="ViewAllIncidents" component={ViewAllIncidents} />
      <Stack.Screen name="UpdateIncident" component={UpdateIncident} />
      <Stack.Screen name="viewIncident" component={viewIncident} />
      <Stack.Screen name="AddAction" component={Incident} />
      <Stack.Screen name="UpdateAction" component={ViewReport} />
      <Stack.Screen name="AddAction" component={AddAction} />
      <Stack.Screen name="UpdateAction" component={UpdateAction} />
    </Stack.Navigator>
  );
}
