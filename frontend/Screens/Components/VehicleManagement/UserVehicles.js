import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Card, Icon } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

const UserVehicles = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const counterRef = useRef(0);

  const isFocused = useIsFocused();

  const getVehicles = async () => {
    try {
      const result = await axios.get(
        `http://192.168.1.10:8000/vehicle/getByUser/6414cb436a4a2f51409b1efc`
      );
      /* Setting the state of the notes and totalPage variables. */
      setVehicles(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVehicle = async (_id) => {
    if (_id) {
      try {
        const result = await axios.delete(
          `http://192.168.1.10:8000/vehicle/delete/${_id}`
        );
        alert("Vehicle deleted successfully!");
        
      } catch (error) {
        console.log(error);
        alert("Error deleting vehicle!")
      }
    }
    counterRef.current.forceUpdate();
  };

  useEffect(() => {
    getVehicles();
  }, [isFocused]);

  const onUpdate = () => {
    // console.log("Update");
  };

  const onDelete = () => {
    // console.log("Delete");
  };

  return (
    <View style={{ top: 50, bottom: 20 }}>
      <View style={styles.row}>
        <Text style={styles.TextTitle}>Add New Vehicle</Text>
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
              <Text style={styles.title}>{vehicle.make} {vehicle.model}</Text>
              <Text style={styles.textLine}>
                No. of passengers: {vehicle.passengers} | Type: {vehicle.vehicleType}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={onUpdate} style={styles.updateBtn}>
                  <Text style={styles.updateBtnText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={((e) => deleteVehicle(vehicle._id))} style={styles.deleteBtn}>
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
});
