import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { Card, Icon } from "@rneui/themed";
import React from "react";
import axios from "axios";
import { useState } from "react";
import CheckBox from "expo-checkbox";

const UpdateVehicle = ({ navigation, route }) => {
  const [make, setMake] = useState(route.params.make);
  const [model, setModel] = useState(route.params.model);
  const [plateNo, setPlateNo] = useState(route.params.plateNo);
  const [passengers, setPassengers] = useState(route.params.passengers);
  const [vehicleType, setVehicleType] = useState(route.params.vehicleType);

  const resetForm = () => {
    setMake(route.params.make);
    setModel(route.params.model);
    setPlateNo(route.params.plateNo);
    setPassengers(route.params.passengers);
    setVehicleType(route.params.vehicleType);
  };

  const backButton = (e) => {
    if (make !== "" || model !== "" || vehicleType !== "") {
      setBackShow(true);
    } else {
      navigation.navigate("UserVehicles", {});
    }
  };

  const update = async (e) => {
    if (e) {
       if (
         firstName == null ||
         lastName == null ||
         email == null ||
         mobile == null ||
         address == null ||
         password == null ||
         passwordVerify == null
       ) {
         alert("Please fill all fields");
         return;
       }
      try {
        /* Creating an object with the same name as the variables. */
        const vehicleData = {
          // user: userId,
          make,
          model,
          plateNo,
          passengers,
          vehicleType,
        };
        const result = await axios.put(`http://192.168.1.10:8000/vehicle/update/${route.params._id}`, vehicleData);

        if (result?.status === 201) {
          // setSuccessShow(true);
          alert("Vehicle added successfully!");
          navigation.navigate("UserVehicles", {});
        }
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.errorMessage);
      }
    } else {
      setConfirm(false);
    }
  };

  return (
    <ScrollView style={{ top: 50 }}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => backButton()}>
          <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.TextTitle}>Update vehicle details</Text>
      </View>

      <Card.Divider color="black" style={{ height: 4 }} />

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Make</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={make}
          style={styles.TextInput}
          required
          placeholder="Make (Toyota, Nissan, etc.)"
          onChangeText={(e) => setMake(e)}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Model</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={model}
          style={styles.TextInput}
          placeholder="Model (Corolla, Tiida, etc.)"
          onChangeText={(e) => setModel(e)}
        />

        <Text style={styles.label}>Plate Number</Text>
        <TextInput
          value={plateNo}
          style={styles.TextInput}
          maxLength={8}
          placeholder="Plate Number (ABC-1234, etc.)"
          onChangeText={(e) => setPlateNo(e)}
        />

        <Text style={styles.label}>No of Passengers</Text>
        <TextInput
          value={passengers}
          style={styles.TextInput}
          maxLength={1}
          keyboardType="numeric"
          placeholder="No of Passengers (1, 2, 3, etc.)"
          onChangeText={(e) => setPassengers(e.replace(/[^0-9]/g, ""))}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Vehicle Type</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={vehicleType}
          style={styles.TextInput}
          placeholder="Vehicle Type (Car, Van, etc.)"
          onChangeText={(e) => setVehicleType(e)}
        />

        <View style={styles.row}>
          <TouchableOpacity style={styles.resetBtn} onPress={resetForm}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={update}>
            <Text style={styles.addText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateVehicle;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 35,
    marginLeft: 10,
  },
  TextTitle: {
    marginLeft: 10,
    fontSize: 20,
  },
  container: {
    backgroundColor: "grey",
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 25,
    height: "79%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 30,
    marginLeft: 15,
  },
  required: {
    fontWeight: "bold",
    color: "red",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 2,
  },
  TextInput: {
    height: 50,
    padding: 10,
    borderWidth: 3,
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
  },
  checkBox: {
    marginTop: 31,
    marginLeft: 15,
    borderWidth: 3,
    borderColor: "black",
  },
  resetBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 27,
    marginTop:20,
    marginBottom:130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#D3D3D3",
  },
  addBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 20,
    marginTop:20,
    marginBottom:130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  resetText: {
    color: "black",
    fontSize: 20,
  },
  addText: {
    color: "white",
    fontSize: 20,
  },
});
