import React, { useContext, useEffect, useState } from "react";
import { Card, Icon } from "@rneui/themed";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../constants/Url.json";
import { useIsFocused } from "@react-navigation/native";
import CustomAlert from "../customAlert/CustomAlert";

export default function ViewStatus({ navigation, route }) {
  const id = route.params.id;
  const isFocused = useIsFocused();
  const [reqData, setReqData] = useState([]);
  const [status, setStatus] = useState("");
  const [successShow, setSuccessShow] = useState(false);

  async function getReqData() {
    await axios.get(BASE_URL + `/request/ride/${id}`).then((res) => {   
      if (res.status === 200) {
        setReqData(res.data[0]);
        if (res.data[0].status === "Accepted") {
          setStatus(res.data[0].status);
        } else {
          setStatus(res.data[0].status);
        }
      }
    });
  }

  function ConfirmHandler() {
    setSuccessShow(false);
    navigation.navigate("RideSummary", { id: id });
  }

  async function handleConfirm() {
    const dataObject = {
      status: "Confirmed",
    };
    await axios
      .put(BASE_URL + `/request/status/${id}`, dataObject)
      .then((res) => {
        if (res.status === 200) {
          //setVehicleOwnerBlock(true);
          setSuccessShow(true);
        }
      });
  }

  useEffect(() => {
    getReqData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ViewRequest", { data: reqData });
          }}
        >
          <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.TextTitle1}>Ride Status</Text>
      </View>

      <Card.Divider color="black" style={{ height: 4 }} />

      <View
        style={
          status === "Pending" || status === "Requested"
            ? styles.container1
            : styles.container2
        }
      >
        <Text style={styles.text}>Status : {status}</Text>
      </View>

      {reqData.status === "Accepted" || reqData.status === "Confirmed" ? (
        <ScrollView style={{ height: "70%", marginBottom: 10 }}>
          <View
            style={{
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#DFD8D7",
              borderColor: "#DFD8D7",
              borderRadius: 15,
              elevation: 20,
              padding: 10,
            }}
          >
            <Text style={styles.text2}>
              Vehicle Owner :{" "}
              {reqData.vehicleOwner?.firstName +
                " " +
                reqData.vehicleOwner?.lastName}
            </Text>
            <Text style={styles.text2}>
              Mobile : {reqData.vehicleOwner?.mobile}
            </Text>
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Vehicle Details:
            </Text>
            {reqData.vehicle?.makeHide === false && (
              <Text style={styles.text2}>Make : {reqData.vehicle?.make}</Text>
            )}
            {reqData.vehicle?.modelHide === false && (
              <Text style={styles.text2}>Model : {reqData.vehicle?.model}</Text>
            )}
            {reqData.vehicle?.plateNoHide === false && (
              <Text style={styles.text2}>
                Plate No : {reqData.vehicle?.plateNo}
              </Text>
            )}
            {reqData.vehicle?.passengersHide === false && (
              <Text style={styles.text2}>
                Passengers : {reqData.vehicle?.passengers}
              </Text>
            )}
            {reqData.vehicle?.registeredHide === false && (
              <Text style={styles.text2}>
                Registered :{" "}
                {reqData.vehicle?.registered === true ? "Yes" : "No"}
              </Text>
            )}
            <Text style={styles.text2}>
              Vehicle Type : {reqData.vehicle?.vehicleType}
            </Text>

            <View style={{ padding: 10 }}>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleConfirm}
              >
                <Text style={styles.conText}>Confirm Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        ""
      )}
      <CustomAlert
        displayMode={"success"}
        displayMsg={"Request confirmed successfully!"}
        visibility={successShow}
        dismissAlert={ConfirmHandler}
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
  icon: { marginTop: 10, marginLeft: 20, fontSize: 35 },
  TextTitle1: {
    padding: 0,
    fontSize: 30,
    marginLeft: 30,
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
    backgroundColor: "#F5FFCB",
    margin: 20,
    borderWidth: 4,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "10%",
  },
  container2: {
    backgroundColor: "#009945",
    margin: 20,
    borderWidth: 4,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "10%",
  },
  text: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text1: {
    padding: 3,
    fontSize: 18,
    fontWeight: "bold",
  },
  text2: {
    padding: 3,
    fontSize: 20,
  },
  confirmBtn: {
    width: "45%",
    borderRadius: 25,
    marginTop: 20,
    marginLeft: 150,
    height: 50,
    backgroundColor: "#8B51F5",
  },
  conText: {
    padding: 15,
    color: "white",
    fontSize: 15,
  },
});
