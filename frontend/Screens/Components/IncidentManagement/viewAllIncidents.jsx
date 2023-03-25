import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CardList } from "react-native-card-list";
import { deldata } from "./context/ContextProvider";
import { Text, Card, Button, Icon } from "@rneui/themed";
import SearchBar from "react-native-dynamic-search-bar";
import { BASE_URL } from "../constants/Url.json";

function ViewAllIncidents({ navigation }) {
    const [getincidentdata, setIncidentdata] = useState([]);
    const { setDLTdata } = useContext(deldata);
    const [searchTerm, setSearchTerm] = useState("");
    

    const getdata = async () => {
        const res = await fetch(BASE_URL + `/incident/view`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
        console.log(data);
        } else {
            console.log(data);
        setIncidentdata(data);
        }
    };

    useEffect(() => {
        getdata();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteincident = async (id) => {
        const res2 = await fetch(BASE_URL + `/incident/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
        console.log("error");
        } else {
        alert("Incident Details Deleted Successfully");
        console.log("incident deleted");
        // setDLTdata(deletedata);
        getdata();
        }
    };

  return (
    <>
      

<View style={styles.container}>
      <Text style={styles.TextTitle1}></Text>
      <View style={styles.row}>
        <Text style={styles.TextTitle2}>List of Incidents</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ViewReport", {})}>
          <Icon
            name="report"
            color="#000000"
            iconStyle={{ marginLeft: 60, fontSize: 40 }}
          />
        </TouchableOpacity>
      </View>
      <Card.Divider color="black" />
      <View style={{ margin: 10 }}>
        <SearchBar
          type="search"
          placeholder="Search"
          onChangeText={(incident) => {
            setSearchTerm(incident);
          }}
          onClearPress={getdata}
        />
      </View>
      <ScrollView style={{ height: "58%", marginBottom: 10 }}>
        {getincidentdata
          .filter((element) => {
            if (searchTerm === "") {
              return element;
            } else if (
              element.incident
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return element;
            } else {
              return false;
            }
          })
          .map((element, id) => {
            // if(element.length === 0){
            //   <Text style={styles.errorMessage}>No Result Found</Text>
            // }
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("viewIncident", {})}
                key={id}
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
                    

                    <View>
                      <Text style={{marginLeft : 50, fontWeight: "bold", fontSize: 20}}>
                        Incident ID : I{id+1000}
                      </Text>
                      </View>
                      <View style={styles.fixToText} >
      
      <Button title='Remove'
      style={{color: '#ed5209', margin: 150}} 
      onPress={() => deleteincident(element._id)}
      ></Button>
      </View>
      <View style={styles.fixToText} >
      <Button style={{color: '#ed5209', margin: 250}} title='Take Action'
       
      onPress={() =>
                      navigation.navigate("AddAction", {
                        id: element._id,
                      })
                    }
                    />
                    </View>
      
      </View>
                    
                  
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
    </>
  );
}

export default ViewAllIncidents;



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
  fixToText: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         marginLeft: 40,
         marginRight: 20,
         marginTop: 20
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
  },
  errorMessage: {
    color: "black",
    textAlign: "center",
  },
});
