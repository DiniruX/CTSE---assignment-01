import React, { useContext, useState } from "react";
import { Card, Icon } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BASE_URL } from "../constants/Url.json";
import axios from "axios";
import CustomAlert from "../customAlert/CustomAlert";

function UpdateRequest({ navigation, route }) {
  const [from, setFrom] = useState(route.params.data.locationFrom);
  const [to, setTo] = useState(route.params.data.locationTo);
  const [time, setTime] = useState(new Date(route.params.data.dateAndTime));
  const [seats, setSeats] = useState(route.params.data.noOfSeats);
  const [isOpen, setIsOpen] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);  

  const changeSelectedTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setIsOpen(false);
  };

  function handleTimeOpen() {
    setIsOpen(true);
  }

  function handleUndo() {
    setFrom(route.params.data.locationFrom);
    setTo(route.params.data.locationTo);
    setTime(new Date(route.params.data.dateAndTime));
    setSeats(route.params.data.noOfSeats);
  }

  function handleMinus() {
    if (seats !== 1) {
      setSeats(seats - 1);
    }
  }

  function handlePlus() {
    if (seats < 5) {
      setSeats(seats + 1);
    }
  }

  async function handleUpdate() {
    try {
      if (from === "" || to === "") {
        setErrorShow(true);
      } else {
        const dataObject = {
          passenger: route.params.data.passenger,
          locationFrom: from,
          locationTo: to,
          dateAndTime: time,
          noOfSeats: seats,
        };

        await axios.put(
          BASE_URL + `/request/update/${route.params.data._id}`,
          dataObject
        );
        setSuccessShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigate() {
    const dataObject = {
      passenger: route.params.data.passenger,
      locationFrom: from,
      locationTo: to,
      dateAndTime: time,
      noOfSeats: seats,
      _id: route.params.data._id,
    };
    dataObject.dateAndTime = dataObject.dateAndTime.toString();
    setSuccessShow(false);
    navigation.navigate("ViewRequest", { data: dataObject });
  }

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewRequest", { data: route.params.data })
          }
        >
          <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.TextTitle}>Update Request</Text>
      </View>

      <View style={styles.container1}>
        <Text style={styles.text1}>Ride Details</Text>

        <Card.Divider color="black" style={{ height: 8 }} />

        <View style={styles.row}>
          <Text style={styles.label}>From</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={from}
          style={styles.TextInput}
          onChangeText={(location1) => setFrom(location1)}
          placeholder="Location From"
        />

        <View style={styles.row}>
          <Text style={styles.label}>To</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={to}
          style={styles.TextInput}
          onChangeText={(location2) => setTo(location2)}
          placeholder="Location To"
        />

        <View style={styles.row}>
          <Text style={styles.label}>Time?</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TouchableOpacity onPress={handleTimeOpen}>
          <Text style={styles.TextInput}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {isOpen === true ? (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={changeSelectedTime}
          />
        ) : (
          ""
        )}

        <Text style={styles.label}>Seats Needed?</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleMinus}>
            <Icon
              name="remove-circle-outline"
              color="black"
              iconStyle={styles.seatsIcons}
            />
          </TouchableOpacity>

          <Text style={styles.seatsText}>{seats}</Text>

          <TouchableOpacity onPress={handlePlus}>
            <Icon
              name="add-circle-outline"
              color="black"
              iconStyle={styles.seatsIcons}
            />
          </TouchableOpacity>
        </View>

        <Card.Divider color="black" style={{ height: 15 }} />

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.undoBtn} onPress={handleUndo}>
            <Text style={styles.resetText}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.reqText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomAlert
        displayMode={"success"}
        displayMsg={"Request updated successfully!"}
        visibility={successShow}
        dismissAlert={handleNavigate}
      />
    </View>
  );
}

export default UpdateRequest;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  icon: { fontSize: 35 },
  TextTitle: {
    marginTop: 10,
    fontSize: 40,
    marginLeft: 30,
  },
  container1: {
    backgroundColor: "#D5BEFF",
    margin: 10,
    borderWidth: 1,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "82%",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 25,
    padding: 10,
    textAlign: "center",
  },
  TextInput: {
    height: 50,
    padding: 10,
    borderWidth: 3,
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#8B51F5",
    backgroundColor: "white",
    fontSize: 22,
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
  undoBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 27,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#8B51F5",
  },
  updateBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 20,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B51F5",
  },
  resetText: {
    color: "black",
    fontSize: 20,
  },
  reqText: {
    color: "white",
    fontSize: 20,
  },
  bottomRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  seatsIcons: { fontSize: 35, margin: 15 },
  seatsText: { fontSize: 45 },
});
