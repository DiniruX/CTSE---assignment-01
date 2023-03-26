import { useContext, useState } from "react";
import { Card } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../constants/Url.json";
import CustomAlert from "../customAlert/CustomAlert";
import AuthContext from "../../Context/UserContext";

export default function ViewProposalVehicleOwner({ navigation, route }) {
  const timeEdited = new Date(
    route.params.request?.dateAndTime
  )?.toLocaleTimeString();

  const [confirm, setConfirm] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [pendingShow, setPendingShow] = useState(false);
  const [rejectShow, setRejectShow] = useState(false);
  const [successShowStatus, setSuccessShowStatus] = useState(false);

  const { setVehicleOwnerBlock } = useContext(AuthContext);

  const deleteHandler = async () => {
    setConfirm(true);
  };

  const successAlert = (e) => {
    setSuccessShow(false);
    setRejectShow(false);
    setPendingShow(false);
    setSuccessShowStatus(false);
    setConfirm(false);
    navigation.navigate("RequestList", {});
  };

  const successAlertStatus = (e) => {
    setSuccessShow(false);
    setRejectShow(false);
    setPendingShow(false);
    setSuccessShowStatus(false);
    setConfirm(false);
    navigation.navigate("RideSummary", {});
  };

  async function handleDelete(e) {
    if (e) {
      try {
        const dataObject = {
          vehicleOwner: null,
          vehicle: null,
          status: "Requested",
        };

        await axios.put(
          BASE_URL + `/request/update/${route.params.request?._id}`,
          dataObject
        );
        setVehicleOwnerBlock(false);
        setSuccessShow(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setConfirm(false);
    }
  }

  async function getStatus(e) {
    try {
      const result = await axios.get(
        BASE_URL + `/request/ride/${route.params.request?._id}`
      );
      if (result.data[0].status === "Confirmed") {
        setSuccessShowStatus(true);
      } else if (result.data[0].status === "Accepted") {
        setPendingShow(true);
      } else {
        setRejectShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text style={styles.TextTitle}>Your Ride Proposal</Text>

      <View style={styles.container1}>
        <Text style={styles.text1}>Ride Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Passenger</Text>
        </View>
        <TextInput
          value={
            route.params.request?.passenger?.firstName +
            " " +
            route.params.request?.passenger?.lastName
          }
          style={styles.TextInput}
          editable={false}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Mobile</Text>
        </View>
        <TextInput
          value={route.params.request?.passenger?.mobile.toString()}
          style={styles.TextInput}
          editable={false}
        />

        <View style={styles.row}>
          <Text style={styles.label}>From</Text>
        </View>
        <TextInput
          value={route.params?.request?.locationFrom}
          style={styles.TextInput}
          editable={false}
        />

        <View style={styles.row}>
          <Text style={styles.label}>To</Text>
        </View>
        <TextInput
          value={route.params?.request?.locationTo}
          style={styles.TextInput}
          editable={false}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Time?</Text>
        </View>
        <TextInput
          value={timeEdited}
          style={styles.TextInput}
          editable={false}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Seats Needed?</Text>
        </View>
        <TextInput
          value={route.params?.request?.noOfSeats?.toString()}
          style={styles.TextInput}
          editable={false}
        />

        <Card.Divider color="black" style={{ height: 8 }} />

        <View style={styles.row}>
          <TouchableOpacity style={styles.statusBtn} onPress={getStatus}>
            <Text style={styles.reqText}>View Status</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={deleteHandler}>
            <Text style={styles.reqText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomAlert
        displayMode={"confirm"}
        displayMsg={"Do you really want to decline?"}
        visibility={confirm}
        dismissAlert={setConfirm}
        confirmAlert={handleDelete}
      />
      <CustomAlert
        displayMode={"success"}
        displayMsg={"Request declined successfully!"}
        visibility={successShow}
        dismissAlert={successAlert}
      />
      <CustomAlert
        displayMode={"success"}
        displayMsg={"User has accepted your request!!"}
        visibility={successShowStatus}
        dismissAlert={successAlertStatus}
      />
      <CustomAlert
        displayMode={"pending"}
        displayMsg={"User has not accepted your request yet!"}
        visibility={pendingShow}
        dismissAlert={setPendingShow}
      />
      <CustomAlert
        displayMode={"error"}
        displayMsg={"User has rejected your request!"}
        visibility={rejectShow}
        dismissAlert={successAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    top: 0,
  },
  icon: { fontSize: 35 },
  TextTitle: {
    fontSize: 40,
    textAlign: "center",
  },
  container1: {
    backgroundColor: "#D5BEFF",
    margin: 10,
    borderWidth: 1,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "84%",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
  },
  required: {
    fontWeight: "bold",
    color: "red",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 2,
  },
  statusBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 25,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#405DF4",
  },
  deleteBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 15,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F55151",
  },
  reqText: {
    color: "white",
    fontSize: 20,
  },
  TextInput: {
    height: 40,
    paddingLeft: 10,
    borderWidth: 3,
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#8B51F5",
    backgroundColor: "white",
    fontSize: 22,
    color: "black",
  },
  seatsText: { fontSize: 45, marginLeft: 50 },
});
