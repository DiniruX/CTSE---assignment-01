import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { Card, Icon } from "@rneui/themed";
import React from "react";
import axios from "axios";
import { useState } from "react";
import CheckBox from "expo-checkbox";
import imagePicker from "react-native-image-picker";

const AddVehicle = ({ navigation }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [passengers, setPassengers] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [registered, setRegistered] = useState(false);

  const resetForm = () => {
    setMake("");
    setModel("");
    setPlateNo("");
    setPassengers("");
    setVehicleType("");
  };

  const handleImgUpload = () => {
    imagePicker.showImagePicker({maxWidth: 400, maxHeight: 400}, (response) => {
      if (response.didCancel) {
        return;
      }

      const img = {
        uri: response.uri,
        type: response.type,
        name: response.fileName || response.uri.substring(response.uri.lastIndexOf("/") + 1)
      }
    });
  };

  const backButton = (e) => {
    navigation.navigate("UserVehicles", {});
  };

  const register = async (e) => {
    if (e) {
      try {
        /* Creating an object with the same name as the variables. */
        const UserData = {
          // user: userId,
          make,
          model,
          plateNo,
          passengers,
          vehicleType,
          registered,
        };
        const result = await axios.post(
          "http://192.168.1.10:8000/vehicle/add",
          UserData
        );

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
        <Text style={styles.TextTitle}>Add New Vehicle</Text>
      </View>

      <Card.Divider color="black" style={{ height: 4 }} />

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Photo of car</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: "" }} style={styles.img} />
          <TouchableOpacity onPress={handleImgUpload}>
            <Icon name="add" color="black" iconStyle={styles.addIcon} />
          </TouchableOpacity>
        </View>

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
          <CheckBox
            disabled={false}
            style={styles.checkBox}
            value={registered}
            onValueChange={(e) => setRegistered(e)}
          />
          <Text style={styles.label}>Vehicle Registered in SLIIT</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.resetBtn} onPress={resetForm}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={register}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddVehicle;

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
    marginTop: 20,
    marginBottom: 130,
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
    marginTop: 20,
    marginBottom: 130,
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
  imageContainer: {
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 25,
    height: 220,
  },
  addIcon: {
    marginTop:180,
    marginLeft: 320,
  }
});
