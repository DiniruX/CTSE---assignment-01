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

export default function AddAdmin({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const addAdmin = async (e) => {
    e.preventDefault();
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
        "http://172.28.5.86:8000/user/add",
        RegisterData
      );
      console.log(result);

      if (result) {
        alert(result.data.Message);
        navigation.navigate("UserList", {});
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.errorMessage);
    }
  };

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
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate("UserList")}>
          <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.header}>Add Admin</Text>
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
        <Card.Divider color="black" style={{ height: 4, marginTop: 20 }} />

        <View style={styles.row}>
          <TouchableOpacity style={styles.resetBtn} onPress={resetForm}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} onPress={addAdmin}>
            <Text style={styles.addText}>Add admin</Text>
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
    fontSize: 50,
    fontWeight: "bold",
    alignItems: "center",
    marginLeft: 60,
  },
  container: {
    backgroundColor: "#D5BEFF",
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 25,
    height: "89%",
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
    marginBottom: 125,
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
    marginBottom: 125,
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
