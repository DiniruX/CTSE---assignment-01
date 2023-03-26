import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestList from "./RequestManagement/RequestList";
import AddRequest from "./RequestManagement/AddRequest";
import ViewRequestInfo from "./RequestManagement/ViewRequestInfo";
import ViewRequest from "./RequestManagement/ViewRequest";
import ViewStatus from "./RequestManagement/ViewStatus";
import RideSummary from "./RequestManagement/RideSummary";
import ViewRequestVehicleOwner from "./RequestManagement/ViewProposalVehicleOwner";
import AuthContext from "../Context/UserContext";
import UpdateRequest from "./RequestManagement/UpdateRequest";

export default function RequestNavigationStack() {
  const { vehicleOwnerBlock } = React.useContext(AuthContext);

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {vehicleOwnerBlock === true ? (
        <>
          <Stack.Screen
            name="ViewRequestVehicleOwner"
            component={ViewRequestVehicleOwner}
          />
          <Stack.Screen name="RideSummary" component={RideSummary} />
        </>
      ) : (
        <></>
      )}
      {vehicleOwnerBlock === false ? (
        <>
          <Stack.Screen name="RequestList" component={RequestList} />
          <Stack.Screen name="AddRequest" component={AddRequest} />
          <Stack.Screen name="ViewRequestInfo" component={ViewRequestInfo} />
          <Stack.Screen name="ViewRequest" component={ViewRequest} />
          <Stack.Screen name="ViewStatus" component={ViewStatus} />
          <Stack.Screen name="UpdateRequest" component={UpdateRequest} />
          <Stack.Screen name="RideSummary" component={RideSummary} />
          <Stack.Screen
            name="ViewRequestVehicleOwner"
            component={ViewRequestVehicleOwner}
          />
        </>
      ) : (
        <></>
      )}
    </Stack.Navigator>
  );
}
