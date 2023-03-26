import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Card } from "@rneui/themed";

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [address, setAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordVerify, setPasswordVerify] = useState(null);

/**
 * It's a function that sends a post request to the server with the user's data.
 * @returns The result is being returned as an object.
 */
  const register = async (e) => {
    e.preventDefault();
   /* This is checking if any of the fields are empty. If they are, it will alert the user to fill all
   fields. */
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
      const RegisterData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        address: address,
        password: password,
      };

      const result = await axios.post(
        "http://192.168.1.169:8000/user/register",
        RegisterData
      );

      if (result) {
        alert(result.data.Message);
        navigation.navigate("Login", {});
      }
    } catch (err) {
      alert(err.response.data.errorMessage);
      console.log(err);
    }
  };

/**
 * "resetForm" is a function that sets the state of all the form fields to an empty string.
 */
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobile("");
    setAddress("");
    setPassword("");
    setPasswordVerify("");
  };

  return (
    <ScrollView style={{ top: 20 }}>
      <Text style={styles.header}>Travel Buddy</Text>
      <Text style={styles.header2}>Register</Text>

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
          placeholderTextColor="#003f5c"
          onChangeText={(firstName) => setFirstName(firstName)}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={lastName}
          style={styles.TextInput}
          required
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={email}
          style={styles.TextInput}
          required
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Mobile Number</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={mobile}
          style={styles.TextInput}
          required
          keyboardType="numeric"
          maxLength={10}
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

        <View style={styles.row}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={password}
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Confirm Password</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <TextInput
          value={passwordVerify}
          style={styles.TextInput}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(passwordVerify) => setPasswordVerify(passwordVerify)}
        />

        <View style={styles.row}>
          <TouchableOpacity style={styles.resetBtn} onPress={resetForm}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={register}>
            <Text style={styles.addText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  header: {
    fontSize: 60,
    fontWeight: "bold",
    alignItems: "center",
    marginLeft: 20,
  },
  header2: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    alignItems: "center",
    marginLeft: 150,
  },
  container: {
    backgroundColor: "#D5BEFF",
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 25,
    height: "71%",
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
    marginBottom: 140,
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
    marginBottom: 140,
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
