import { StyleSheet, Modal, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CustomAlert({
  displayMode,
  displayMsg,
  visibility,
  dismissAlert,
  confirmAlert,
}) {
  return (
    <View>
      <Modal visible={visibility} animationType={"fade"} transparent={true}>
        <View style={styles.background}>
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              {displayMode == "success" ? (
                <>
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    color={"green"}
                    size={100}
                  />
                </>
              ) : (
                ""
              )}
              {displayMode == "confirm" ? (
                <>
                  <Ionicons
                    name="help-circle-outline"
                    color={"black"}
                    size={100}
                  />
                </>
              ) : (
                ""
              )}
              {displayMode == "error" ? (
                <>
                  <Ionicons
                    name="alert-circle-outline"
                    color={"red"}
                    size={100}
                  />
                </>
              ) : (
                ""
              )}
              {displayMode == "pending" ? (
                <>
                  <Ionicons
                    name="alert-circle-outline"
                    color={"black"}
                    size={100}
                  />
                </>
              ) : (
                ""
              )}
              <Text
                style={{
                  fontSize: 22,
                  marginTop: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {displayMsg}
              </Text>
            </View>

            {displayMode == "confirm" ? (
              <View style={styles.row}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => confirmAlert(false)}
                  style={styles.noBtn}
                >
                  <Text style={{ color: "black" }}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => confirmAlert(true)}
                  style={styles.yesBtn}
                >
                  <Text style={{ color: "white" }}>Yes</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => dismissAlert(false)}
                style={styles.addBtn}
              >
                <Text style={{ color: "white", margin: 15 }}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  background: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D5BEFF",
    height: "40%",
    width: "90%",
    borderWidth: 1,
    borderColor: "#8B51F5",
    borderRadius: 7,
    elevation: 10,
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
  checkBox: {
    marginTop: 10,
    marginLeft: 15,
    borderWidth: 3,
    borderColor: "#8B51F5",
  },
  noBtn: {
    width: "40%",
    borderRadius: 25,
    marginRight: 20,
    marginTop: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#8B51F5",
  },
  yesBtn: {
    width: "40%",
    borderRadius: 25,
    marginTop: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B51F5",
  },
  addBtn: {
    width: "60%",
    borderRadius: 25,
    marginTop: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B51F5",
  },
  resetText: {
    color: "black",
    fontSize: 20,
  },
  addText: {
    color: "white",
    fontSize: 20,
  },
  TextInput: {
    height: 50,
    padding: 10,
    borderWidth: 3,
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#8B51F5",
    backgroundColor: "white",
  },
});
