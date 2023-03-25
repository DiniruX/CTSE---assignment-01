import React, { useContext, useEffect, useState } from "react";
import { Card, Icon } from "@rneui/themed";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import SearchBar from "react-native-dynamic-search-bar";
import { useIsFocused } from "@react-navigation/native";
import { BASE_URL } from "../constants/Url.json";
import AuthContext from "../../Context/UserContext";

export default function RequestList({ navigation }) {
  const isFocused = useIsFocused();
  const [requestList, setRequestList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const { userName } = useContext(AuthContext);

  async function getRequestData() {
    try {
      await axios.get("http://172.28.5.86:8000/request/getAll").then((res) => {
        if (res.status === 200) {
          setRequestList(res.data);
          console.log(requestList);
        }
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  // empty dependencies array this will cause the effect function
  // to only run once after the component has rendered the first time.
  useEffect(() => {
    getRequestData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.TextTitle1}>Hi {userName},</Text> */}
      <View style={styles.row}>
        <Text style={styles.TextTitle2}>Ride Requests</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddRequest", {})}>
          <Icon
            name="add"
            color="#000000"
            iconStyle={{ marginLeft: 60, fontSize: 40 }}
          />
        </TouchableOpacity>
      </View>
      <Card.Divider color="black" />
      <View style={{ margin: 10 }}>
        <SearchBar
          type="search"
          placeholder="Search By Location"
          onChangeText={(location) => {
            setSearchTerm(location);
          }}
          onClearPress={getRequestData}
        />
      </View>
      <ScrollView style={{ height: "58%", marginBottom: 10 }}>
        {requestList
          .filter((element) => {
            if (searchTerm === "") {
              return element;
            } else if (
              element.locationTo
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return element;
            } else {
              return false;
            }
          })
          .map((element, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewRequestInfo", {
                    request: element,
                    image: `https://xsgames.co/randomusers/assets/avatars/male/${index}.jpg`,
                  })
                }
                key={index}
              >
                <View
                  style={{
                    borderWidth: 1,
                    height: 100,
                    margin: 15,
                    backgroundColor: "#DFD8D7",
                    borderColor: "#DFD8D7",
                    borderRadius: 15,
                    elevation: 20,
                  }}
                >
                  <View style={styles.row1}>
                    <Image
                      source={{
                        uri: `https://xsgames.co/randomusers/assets/avatars/male/${index}.jpg`,
                      }}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: "contain",
                        margin: 8,
                      }}
                    />

                    <View>
                      {/* <Text style={styles.text1}>
                        {element.passenger.firstName +
                          " " +
                          element.passenger.lastName}
                      </Text> */}
                      <Text style={styles.text2}>{element.locationFrom}</Text>
                      <Text style={styles.text2}>{element.locationTo}</Text>
                      <Text style={styles.text2}>{element.dateAndTime}</Text>
                      <Text style={styles.text2}>{element.noOfSeats}</Text>
                    </View>
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
    margin: 20,
    borderWidth: 1,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "85%",
    padding: 0,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { marginTop: 10, marginRight: 20, fontSize: 35 },
  TextTitle1: {
    marginTop: 20,
    fontSize: 20,
    marginLeft: 45,
  },
  TextTitle2: {
    padding: 0,
    marginLeft: 20,
    fontSize: 30,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  text2: {
    fontSize: 15,
    textAlign: "center",
  },
  row1: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  errorMessage: {
    color: "black",
    textAlign: "center",
  },
});
