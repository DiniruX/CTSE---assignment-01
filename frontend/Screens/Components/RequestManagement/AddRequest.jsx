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
// import AuthContext from "../../Context/UserContext";
// import { AuthContextProvider } from "../../Context/UserDetailsContext";
import AuthContext from "../../Context/UserDetailsContext";
import CustomAlert from "../customAlert/CustomAlert";

export default function AddRequest({ navigation }) {
  const { userId } = useContext(AuthContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState(new Date());
  const [seats, setSeats] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [responseData, setResponseData] = useState([]);

  const changeSelectedTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setIsOpen(false);
  };

  function handleTimeOpen() {
    setIsOpen(true);
  }

  function handleReset() {
    setFrom("");
    setTo("");
    setTime(new Date());
    setSeats(1);
  }

  //if set count is not 1 then seat - 1. initial value is 1.
  function handleMinus() {
    if (seats !== 1) {
      setSeats(seats - 1);
    }
  }

  //maximum seat count is 5.
  function handlePlus() {
    if (seats < 5) {
      setSeats(seats + 1);
    }
  }

  async function handleRequest() {
    try {
      if (from === "" || to === "") {
        setErrorShow(true);
      } else {
        const dataObject = {
          passenger: userId,
          locationFrom: from,
          locationTo: to,
          dateAndTime: time,
          noOfSeats: seats,
        };

        await axios.post(BASE_URL + "/request/add", dataObject).then((res) => {
          if (res.status === 201) {
            // Setting saved data in a useState to pass to other component
            setResponseData(res.data.data);
          }
        });
        setSuccessShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigate() {
    setSuccessShow(false);
    navigation.navigate("ViewRequest", { data: responseData });
  }

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate("RequestList", {})}
        >
          <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.TextTitle}>Request a Ride</Text>
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

        <Card.Divider color="black" style={{ height: 10 }} />

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reqBtn} onPress={handleRequest}>
            <Text style={styles.reqText}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomAlert
        displayMode={"error"}
        displayMsg={"Please enter all the mandatory fields!"}
        visibility={errorShow}
        dismissAlert={setErrorShow}
      />
      <CustomAlert
        displayMode={"success"}
        displayMsg={"Request sent successfully!"}
        visibility={successShow}
        dismissAlert={handleNavigate}
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
  resetBtn: {
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
  reqBtn: {
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
