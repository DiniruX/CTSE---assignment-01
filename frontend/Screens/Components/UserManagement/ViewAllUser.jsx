import React, { useEffect, useState } from "react";
import { Card, Icon } from "@rneui/themed";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

export default function ViewAllUser({ navigation }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const isFocused = useIsFocused();

  async function getUserData() {
    try {
      await axios.get("http://localhost:8000/user/getAll").then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setUsers(res.data);
        }
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, [isFocused]);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      user.userType.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.TextTitle}>User List</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddAdmin", {})}>
          <Icon
            name="add"
            color="#000000"
            iconStyle={{ marginLeft: 50, fontSize: 30 }}
          />
        </TouchableOpacity>
      </View>
      <Card.Divider color="black" style={{ height: 4 }} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
        />
      </View>
      <ScrollView
        style={{
          height: "70%",
          marginHorizontal: 10,
          backgroundColor: "#D5BEFF",
          borderRadius: 25,
        }}
      >
        {filteredUsers.map((user, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate("UserProfile", user)}
            >
              <View
                style={{
                  borderWidth: 1,
                  height: 75,
                  margin: 15,
                  backgroundColor: "#B48FF8",
                  borderColor: "black",
                  borderRadius: 15,
                  padding: 8,
                  elevation: 15,
                }}
              >
                <Text style={styles.text1}>
                  {user.firstName} {user.lastName}
                </Text>
                <View style={styles.row}>
                  <Text style={styles.text2}>{user.address}</Text>
                  <Text style={styles.text3}>{user.userType}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D5BEFF",
    margin: 15,
    borderWidth: 1,
    borderColor: "balck",
    borderRadius: 25,
    height: "90%",
    padding: 0,
  },
  inputView: {
    backgroundColor: "white",
    elevation: 20,
    borderColor: "#f2bc57",
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 40,
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  TextTitle: {
    fontSize: 50,
    fontWeight: "bold",
    alignItems: "center",
    marginLeft: 80,
  },
  text1: {
    fontSize: 25,
  },
  text2: {
    fontSize: 18,
  },
  text3: {
    fontSize: 18,
    marginLeft: 150,
  },
});
