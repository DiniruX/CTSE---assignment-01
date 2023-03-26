import React, { useEffect, useState } from "react";
import { Card, Icon } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import CustomAlert from "../customAlert/CustomAlert";
import { BASE_URL } from "../constants/Url.json";
import axios from "axios";

export default function RideSummary({ navigation, route }) {
  const id = route.params.id;
  const isFocused = useIsFocused();
  const [reqData, setReqData] = useState([]);
  const [successShow, setSuccessShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function getReqData() {
    await axios.get(BASE_URL + `/request/ride/${id}`).then((res) => {
      if (res.status === 200) {
        setReqData(res.data[0]);
      }
    });
  }

  async function HandleCancel() {
    const dataObject = {
      status: "Cancelled",
    };
    await axios
      .put(BASE_URL + `/request/status/${id}`, dataObject)
      .then((res) => {
        if (res.status === 200) {
          setConfirm(true);
        }
      });
  }

  function HandleNavigate() {
    setConfirm(false);
    navigation.navigate("RequestList", {});
  }

  function HandleComplete() {
    setSuccessShow(true);
  }

  function CompleteHandler() {
    setSuccessShow(false);
    navigation.navigate("RequestList", {});
  }

  useEffect(() => {
    getReqData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.TextTitle1}>Ride Summary</Text>

      <Card.Divider color="black" style={{ height: 4 }} />

      <TouchableOpacity>
        <Icon name="warning" iconStyle={styles.icon} />
      </TouchableOpacity>

      <View style={styles.container1}>
        <Text style={styles.text1}>
          Vehicle : {reqData.vehicle?.vehicleType}
        </Text>
        <Text style={styles.text1}>
          Mobile : {reqData.vehicleOwner?.mobile}
        </Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          height: "30%",
          margin: 15,
          backgroundColor: "#DFD8D7",
          borderColor: "#DFD8D7",
          borderRadius: 15,
        }}
      >
        <Text style={styles.text2}>Journey Details</Text>
        <Text style={styles.text1}>From : {reqData.locationFrom}</Text>
        <Text style={styles.text1}>To : {reqData.locationTo}</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.clcBtn} onPress={HandleCancel}>
          <Text style={styles.reqText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.jrnyBtn} onPress={HandleComplete}>
          <Text style={styles.reqText}>Journey Complete</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        displayMode={"success"}
        displayMsg={"Ride completed successfully!"}
        visibility={successShow}
        dismissAlert={CompleteHandler}
      />
      <CustomAlert
        displayMode={"confirm"}
        displayMsg={"Do you want to cancel this request?"}
        visibility={confirm}
        dismissAlert={setConfirm}
        confirmAlert={HandleNavigate}
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
  icon: { marginTop: 10, marginLeft: 200, fontSize: 35 },
  TextTitle1: {
    padding: 0,
    fontSize: 30,
    marginLeft: 70,
  },
  container: {
    backgroundColor: "#D5BEFF",
    margin: 20,
    borderWidth: 1,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "85%",
    padding: 0,
  },
  container1: {
    backgroundColor: "white",
    margin: 20,
    borderWidth: 4,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "20%",
  },
  text1: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  clcBtn: {
    width: "30%",
    borderRadius: 25,
    marginLeft: 20,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#8B51F5",
  },
  jrnyBtn: {
    width: "50%",
    borderRadius: 25,
    marginLeft: 20,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B51F5",
  },
  reqText: {
    color: "black",
    fontSize: 20,
  },
});
