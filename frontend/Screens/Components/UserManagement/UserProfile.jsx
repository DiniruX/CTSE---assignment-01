import { Card, Icon } from "@rneui/themed";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AuthContext from "../../Context/UserDetailsContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomAlert from "../customAlert/CustomAlert";

export default function UserProfile({ navigation, route }) {
  const [confirm, setConfirm] = useState(false);
  const [successShow, setSuccessShow] = useState(false);

  const { userId, logout } = useContext(AuthContext);

  const [user, setUser] = useState({});

  const isFocused = useIsFocused();

  const deleteHandler = async () => {
    setConfirm(true);
  };

  /**
   * If the route.params is undefined, then logout. Otherwise, navigate to the UserList screen.
   */
  const successAlert = (e) => {
    setSuccessShow(false);
    setConfirm(false);
    console.log(route.params);
    if (route.params === undefined) {
      logout();
    } else {
      navigation.navigate("UserList");
    }
  };

  /**
   * It's an async function that uses the axios library to make a GET request to the backend server, and
   * then sets the state of the user object to the response data.
   */
  const getUserDetails = async (id) => {
    try {
      const result = await axios.get(
<<<<<<< HEAD
        `http://192.168.1.10:8000/user/get/${id}`
=======
        `http://192.168.1.169:8000/user/get/${id}`
>>>>>>> affef0f87e1433cf4e888a00f8b523523ace1d24
      );
      console.log(result.data);
      setUser(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * If the user clicks the delete button, then try to delete the user from the database, if the user is
   * deleted, then show a success message.
   */
  const deleteUser = async (e) => {
    if (e) {
      try {
        const result = await axios.delete(
          `http://192.168.1.169:8000/user/delete/${user._id}`
        );
        if (result?.status === 201) {
          setSuccessShow(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setConfirm(false);
    }
  };

  /* It's an effect hook that runs when the component is mounted, and when the component is focused. */
  useEffect(() => {
    if (route.params === undefined) {
      getUserDetails(userId);
    } else {
      getUserDetails(route.params._id);
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.row}>
        {route.params !== undefined ? (
          <TouchableOpacity onPress={() => navigation.navigate("UserList")}>
            <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
          </TouchableOpacity>
        ) : null}

        <Text style={styles.header}>User Info</Text>
      </View>

      <Card.Divider color="black" style={{ height: 4 }} />

      <View style={styles.container}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.TextInput}>{user.firstName}</Text>
        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.TextInput}>{user.lastName}</Text>
        <Text style={styles.label}>E-Mail : </Text>
        <Text style={styles.TextInput}>{user.email}</Text>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.TextInput}>{user.mobile}</Text>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.TextInput}>{user.address}</Text>
        <Text style={styles.label}>User Type</Text>
        <Text style={styles.TextInput}>{user.userType}</Text>

        <Card.Divider color="black" style={{ height: 4, marginTop: 10 }} />

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => navigation.navigate("UpdateUser", user)}
          >
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={deleteHandler}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomAlert
        displayMode={"confirm"}
        displayMsg={"You want to delete this Account?"}
        visibility={confirm}
        dismissAlert={setConfirm}
        confirmAlert={deleteUser}
      />
      <CustomAlert
        displayMode={"success"}
        displayMsg={"Account deleted successfully!"}
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
  header: {
    fontSize: 50,
    fontWeight: "bold",
    alignItems: "center",
    marginLeft: 65,
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
    elevation: 20,
    borderColor: "black",
    borderRadius: 25,
    height: "75%",
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
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
  },
  deleteBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 27,
    marginBottom: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    backgroundColor: "#F55151",
    borderWidth: 3,
    borderColor: "black",
  },
  updateBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 27,
    marginBottom: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "black",
  },
  deleteText: {
    color: "black",
    fontSize: 20,
  },
  updateText: {
    color: "black",
    fontSize: 20,
  },
});
