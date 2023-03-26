import { useState } from "react";
import { Card, Icon } from "@rneui/themed";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import CustomAlert from "../customAlert/CustomAlert";

export default function UpdateUser({ navigation, route }) {
  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [email, setEmail] = useState(route.params.email);
  const [mobile, setMobile] = useState(route.params.mobile);
  const [address, setAddress] = useState(route.params.address);
  const [backShow, setBackShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [successShow, setSuccessShow] = useState(false);

  /**
   * ResetForm() is a function that sets the state of the form to the values of the route parameters.
   */
  const resetForm = () => {
    setFirstName(route.params.firstName);
    setLastName(route.params.lastName);
    setEmail(route.params.email);
    setMobile(route.params.mobile);
  };

  /**
   * If the user has changed any of the fields, then show the back button. Otherwise, navigate to the
   * UserProfile screen.
   */
  const backButton = () => {
    if (
      firstName !== route.params.firstName ||
      lastName !== route.params.lastName ||
      email !== route.params.email ||
      mobile !== route.params.mobile
    ) {
      setBackShow(true);
    } else {
      navigation.navigate("UserProfile", route.params);
    }
  };

  /**
   * If the user presses the back button, the app will navigate to the UserProfile screen.
   */
  const confirmAlert = () => {
    setBackShow(false);
    if (e) {
      navigation.navigate("UserProfile", route.params);
    }
  };

  /**
   * When the user clicks the button, the success alert will disappear, the back alert will disappear,
   * and the user will be navigated to the UserProfile page.
   */
  const successAlert = (e) => {
    setSuccessShow(false);
    setBackShow(false);
    navigation.navigate("UserProfile", route.params);
  };

  /**
   * When the user clicks the button, set the state of the confirm variable to true.
   */
  const updateHandler = (e) => {
    setConfirm(true);
  };

  /**
   * If the user clicks the update button, then check if all the fields are filled, if not, then alert
   * the user to fill all the fields, if yes, then create an object with the same name as the variables,
   * then send a put request to the server with the object and the id of the user, if the status is 201,
   * then show the success message, if not, then show the error message.
   * @returns The result is returning the updated data.
   */
  const update = async (e) => {
    if (e) {
      if (
        firstName == null ||
        lastName == null ||
        email == null ||
        mobile == null ||
        address == null
      ) {
        alert("Please fill all fields");
        return;
      }
      try {
        /* Creating an object with the same name as the variables. */
        const UserData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile,
          address: address,
        };

        const result = await axios.put(
          `http://192.168.1.169:8000/user/update/${route.params._id}`,
          UserData
        );

        console.log(result);
        if (result?.status === 201) {
          setSuccessShow(true);
        }
      } catch (err) {
        console.error(err);
        setErrorShow(true);
      }
    } else {
      setConfirm(false);
    }
  };

  return (
    <ScrollView style={{ marginBottom: 70 }}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => backButton()}>
          <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.TextTitle}>Update User</Text>
      </View>

      <Card.Divider color="black" style={{ height: 4 }} />

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={firstName}
          style={styles.TextInput}
          required
          placeholder="First Name"
          onChangeText={(e) => setFirstName(e)}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={lastName}
          required
          style={styles.TextInput}
          placeholder="Last Name"
          onChangeText={(e) => setLastName(e)}
        />
        <View style={styles.row}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={email}
          required
          style={styles.TextInput}
          placeholder="E-mail"
          editable={false}
          onChangeText={(e) => setEmail(e)}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={mobile.toString()}
          style={styles.TextInput}
          required
          keyboardType="numeric"
          maxLength={9}
          placeholder="Mobile Number"
          onChangeText={(mobile) => setMobile(mobile.replace(/[^0-9]/g, ""))}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={address}
          style={styles.TextInput}
          required
          placeholder="Address"
          onChangeText={(address) => setAddress(address)}
        />
        <Card.Divider color="black" style={{ height: 4, marginTop: 10 }} />
        <View style={styles.row}>
          <TouchableOpacity style={styles.resetBtn} onPress={resetForm}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={updateHandler}>
            <Text style={styles.addText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomAlert
        displayMode={"confirm"}
        displayMsg={"Discard the changes?"}
        visibility={backShow}
        dismissAlert={setBackShow}
        confirmAlert={confirmAlert}
      />
      <CustomAlert
        displayMode={"confirm"}
        displayMsg={"Do you want to update this user?"}
        visibility={confirm}
        dismissAlert={setConfirm}
        confirmAlert={update}
      />
      <CustomAlert
        displayMode={"success"}
        displayMsg={"User Updated Successfully"}
        visibility={successShow}
        dismissAlert={successAlert}
      />
    </ScrollView>
  );
}

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
    fontSize: 50,
    fontWeight: "bold",
    alignItems: "center",
    marginLeft: 30,
  },
  container: {
    backgroundColor: "#D5BEFF",
    marginLeft: 10,
    paddingTop: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "85%",
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
    borderColor: "black",
  },
  addBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 20,
    marginBottom: 20,
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
  TextInput: {
    height: 50,
    padding: 10,
    borderWidth: 3,
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    elevation: 15,
    borderColor: "black",
    backgroundColor: "white",
  },
});
