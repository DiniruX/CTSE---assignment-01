import { Card, Icon } from "@rneui/themed";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { BASE_URL } from "../constants/Url.json";
// import AuthContext from "../../Context/UserContext";
import AuthContext from "../../Context/UserDetailsContext";
import CustomAlert from "../customAlert/CustomAlert";
import DropDownPicker from "react-native-dropdown-picker";

export default function ViewRequestInfo({ navigation, route }) {
  const [vehiclesName, setVehiclesName] = useState([]);
  const [vehicleTypeOpen, setVehicleTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);

  const { userId, setVehicleOwnerBlock } = useContext(AuthContext);

  const confirmAlert = (e) => {
    if (e) {
      navigation.navigate("RequestList");
    }
  };

  const updateHandler = (e) => {
    if (typeValue === null) {
      setErrorShow(true);
    } else {
      setConfirm(false);
    }
  };

  const successAlert = (e) => {
    setSuccessShow(false);
    setVehicleOwnerBlock(true);
    navigation.navigate("ViewRequestVehicleOwner", route.params);
  };

  async function update(e) {
    if (e) {
      try {
        const dataObject = {
          vehicleOwner: userId,
          vehicle: typeValue,
          status: "Accepted",
        };

        await axios.put(
          BASE_URL + `/request/update/${route.params.request._id}`,
          dataObject
        );
        setSuccessShow(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setConfirm(false);
    }
  }

  const getVehicles = async () => {
    try {
      const result = await axios.get(BASE_URL + `/vehicle/getByUser/${userId}`);
      /* Setting the state of the notes and totalPage variables. */
      for (let vehicle of result.data) {
        setVehiclesName((vehiclesName) => [
          ...vehiclesName,
          {
            label: vehicle.make + " " + vehicle.model,
            value: vehicle._id,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate("RequestList", {})}
        >
          <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.TextTitle1}>Request Info</Text>
      </View>
      <Card.Divider color="black" style={{ height: 20 }} />
      <View style={styles.container1}>
        <View style={styles.row}>
          <Image
            source={{
              uri: route.params.image,
            }}
            style={{
              width: 80,
              height: 80,
              resizeMode: "contain",
              marginLeft: 20,
              marginTop: 30,
            }}
          />
          {/* <Text style={styles.text1}>
            {route.params.request.passenger.firstName}{" "}
            {route.params.request.passenger.lastName}
          </Text> */}
        </View>

        <View style={styles.container2}>
          <Text style={styles.text2}>
            From: {route.params.request.locationFrom}
          </Text>
          <Text style={styles.text2}>
            To: {route.params.request.locationTo}
          </Text>
          <Text style={styles.text2}>
            Time:{" "}
            {new Date(route.params.request.dateAndTime).toLocaleTimeString()}
          </Text>
          <Text style={styles.text2}>
            Seat: {route.params.request.noOfSeats}
          </Text>
        </View>

        <View style={styles.row1}>
          <Text style={styles.text3}>Vehicle Type</Text>
          <DropDownPicker
            style={styles.dropdown}
            open={vehicleTypeOpen}
            value={typeValue}
            items={vehiclesName}
            setOpen={setVehicleTypeOpen}
            setValue={setTypeValue}
            setItems={setVehiclesName}
            placeholder="Select Vehicle"
            theme="LIGHT"
          />
        </View>

        <Card.Divider color="black" style={{ height: 20 }} />

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.decBtn}
            onPress={() => navigation.navigate("RequestList", {})}
          >
            <Text style={styles.reqText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accBtn} onPress={updateHandler}>
            <Text style={styles.reqText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomAlert
        displayMode={"confirm"}
        displayMsg={"Do you want to update this vehicle?"}
        visibility={confirm}
        dismissAlert={setConfirm}
        confirmAlert={update}
      />
      <CustomAlert
        displayMode={"success"}
        displayMsg={"Request Accepted!!"}
        visibility={successShow}
        dismissAlert={successAlert}
      />
      <CustomAlert
        displayMode={"error"}
        displayMsg={"Please select a vehicle type"}
        visibility={errorShow}
        dismissAlert={setErrorShow}
        confirmAlert={confirmAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  row1: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 35 },
  TextTitle1: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 70,
  },
  container1: {
    backgroundColor: "#D5BEFF",
    margin: 10,
    borderWidth: 1,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "77%",
  },
  container2: {
    backgroundColor: "#9f71f5",
    margin: 10,
    borderWidth: 1,
    elevation: 20,
    borderColor: "#8B51F5",
    borderRadius: 25,
    height: "41%",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 25,
    padding: 10,
    textAlign: "center",
  },
  text2: {
    fontSize: 25,
    marginLeft: 5,
    padding: 10,
  },
  text3: {
    fontSize: 20,
    padding: 0,
  },
  decBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 30,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F55151",
  },
  accBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 10,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B51F5",
  },
  reqText: {
    color: "white",
    fontSize: 20,
  },
  dropdown: {
    borderColor: "#808080",
    borderWidth: 3,
    backgroundColor: "#D5BEFF",
    width: "60%",
    height: 50,
    marginLeft: 75,
  },
});
