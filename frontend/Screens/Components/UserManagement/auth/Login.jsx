import { StatusBar } from "expo-status-bar";
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
import AuthContext from "../../../Context/UserDetailsContext";
import { useContext } from "react";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext);

  /**
   * It takes the email and password from the user, sends it to the server, and if the server returns a
   * response, it sets the userId and userType in the context and navigates to the next screen.
   */
  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };

      const result = await axios.post(
        "http://192.168.1.169:8000/user/login",
        loginData
      );

      console.log(result.data);
      console.log(result.data.type);
      if (result) {
        authContext.setUserId(result.data.userId);
        authContext.setUserType(result.data.type);
        navigation.navigate("Your Vehicles", {});
      }
    } catch (err) {
      alert(err.response.data.errorMessage);
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Travel Buddy</Text>
        <Text style={styles.header2}>Login</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.bar} />
        </View>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 20,
            }}
            onPress={() => navigation.navigate("Register", {})}
          >
            Need an Account ? Click to Register now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginHorizontal: 20,
    elevation: 20,
    borderRadius: 10,
    backgroundColor: "#D5BEFF",
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 57,
    fontWeight: "bold",
    alignItems: "center",
  },

  bar: {
    flex: 1,
    height: 3,
    backgroundColor: "grey",
    width: "20%",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  header2: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    alignItems: "center",
  },

  inputView: {
    backgroundColor: "white",
    elevation: 20,
    borderColor: "#f2bc57",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    height: 45,
    marginBottom: 20,
  },

  TextInput: {
    fontSize: 16,
    height: 50,
    flex: 1,
    padding: 10,
    borderRadius: 15,
  },

  loginText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  loginBtn: {
    width: "70%",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#bb8de0",
  },
});
