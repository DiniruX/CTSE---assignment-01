import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Card, Icon } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

const UserVehicles = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [plateNo, setPlateNo] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedMake, setUpdatedMake] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [updatedModel, setUpdatedModel] = useState("");

  const counterRef = useRef(0);

  const isFocused = useIsFocused();

  const handleUpdatePress = (vehicle) => {
    setSelectedItem(vehicle);
    setUpdatedMake(vehicle.make);
    setUpdatedType(vehicle.vehicleType);
    setUpdatedModel(vehicle.model);
    setPlateNo(vehicle.plateNo);
    setModalVisible(true);
  };

  const getVehicles = async (_id) => {
    try {
      const result = await axios.get(
        `http://192.168.1.10:8000/vehicle/getByUser/${_id}`
      );
      /* Setting the state of the notes and totalPage variables. */
      setVehicles(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (_id) => {
    if (_id) {
      try {
        /* Creating an object with the same name as the variables. */
        const UserData = {
          // user: userId,
          updatedMake,
          updatedModel,
          plateNo,
          updatedType,
        };

        const result = await axios.put(
          `http://192.168.1.10:8000/vehicle/update/${_id}`,
          UserData
        );

        if (result?.status === 201) {
          alert("Vehicle updated successfully!");
          setModalVisible(false);
        }
      } catch (err) {
        console.error(err);
        alert("Error updating vehicle!");
      }
    } else {
      alert("Error updating vehicle!");
    }
  };

  useEffect(() => {
    getVehicles();
  }, [isFocused]);

  const deleteVehicle = async (_id) => {
    if (_id) {
      try {
        const result = await axios.delete(
          `http://192.168.1.10:8000/vehicle/delete/${_id}`
        );
        alert("Vehicle deleted successfully!");
      } catch (error) {
        console.log(error);
        alert("Error deleting vehicle!");
      }
    }
    counterRef.current.forceUpdate();
  };

  return (
    <View style={{ top: 50, bottom: 20 }}>
      <View style={styles.row}>
        <Text style={styles.TextTitle}>Your vehicles</Text>
      </View>

      <Card.Divider color="black" style={{ height: 4 }} />

      <ScrollView>
        {vehicles.map((vehicle, i) => {
          return (
            <View style={styles.container}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHw%3D&w=1000&q=80",
                }}
                style={styles.image}
              />
              <Text style={styles.title}>
                {vehicle.make} {vehicle.model}
              </Text>
              <Text style={styles.textLine}>
                No. of passengers: {vehicle.passengers} | Type:{" "}
                {vehicle.vehicleType}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateVehicle", vehicle)}
                  style={styles.updateBtn}
                >
                  <Text style={styles.updateBtnText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={(e) => deleteVehicle(vehicle._id)}
                  style={styles.deleteBtn}
                >
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddVehicle", {})}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserVehicles;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 493,
    right: 10,
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
  },
  text: {
    fontSize: 60,
    color: "white",
    fontWeight: "bold",
    bottom: 13,
  },
  container: {
    borderWidth: 2,
    borderColor: "#D3D3D3",
    backgroundColor: "grey",
    borderRadius: 25,
    width: "95%",
    marginBottom: 10,
    elevation: 10,
    left: 10,
    right: 10,
  },
  image: {
    width: "90%",
    height: 130,
    borderRadius: 10,
    left: 20,
    top: 20,
    elevation: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 25,
    fontSize: 20,
  },
  updateBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 27,
    marginTop: 15,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#D3D3D3",
  },
  updateBtnText: {
    color: "black",
    fontSize: 20,
  },
  deleteBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  deleteBtnText: {
    color: "white",
    fontSize: 20,
  },
  textLine: {
    fontSize: 15,
    // fontWeight: "bold",
    marginLeft: 20,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: {
    fontSize: 35,
    marginLeft: 10,
  },
  TextTitle: {
    marginLeft: 10,
    fontSize: 20,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "grey",
    justifyContent: "left",
    // alignItems: 'center',
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
  modalContainer: {
    backgroundColor: "grey",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 70,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 25,
    height: "80%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 30,
    marginLeft: 15,
  },
});
