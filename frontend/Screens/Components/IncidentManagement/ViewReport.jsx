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
import { DataTable } from 'react-native-paper';

function ViewReport({ navigation }) {
  const [getincidentdata, setIncidentdata] = useState([]);

  const { setDLTdata } = useContext(deldata);
  const [searchTerm, setSearchTerm] = useState("");
  

  const getdata = async () => {
    const res = await fetch(`http://172.28.6.79:8000/incident/view`, {
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
    const res2 = await fetch(`http://172.28.6.79:8000/incident/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      alert("Deleted Incident Details Successfully");
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
        <Text style={styles.TextTitle2}>Incidents Report</Text>
      </View>
      <Card.Divider color="black" />
      
      <ScrollView style={{ height: "58%", marginBottom: 10 }}>
      <View
                  style={{
                    borderWidth: 1,
                    height: 700,
                    margin: 15,
                    backgroundColor: "#DFD8D7",
                    borderColor: "#DFD8D7",
                    borderRadius: 15,
                    elevation: 20,
                  }}
                >
                    <View>
                    <DataTable>
        <DataTable.Header>
          <DataTable.Title>Inc ID</DataTable.Title>
          <DataTable.Title>Vehicle No</DataTable.Title>
          <DataTable.Title>Vehicle Owner</DataTable.Title>
          <DataTable.Title>Passenger</DataTable.Title>
        </DataTable.Header>
        
        {getincidentdata
          
          .map((element, id) => {
            
            return (
              
                
                  <View key={id}>
                    

                    <View>
                      

<DataTable.Row key={id}>
          <DataTable.Cell>I{id+1000}</DataTable.Cell>
          <DataTable.Cell>aa</DataTable.Cell>
          <DataTable.Cell>bc</DataTable.Cell>
          <DataTable.Cell>aa</DataTable.Cell>
        </DataTable.Row>
                      </View>
                      <View style={styles.fixToText} >
      
      
      </View>
      
      
      </View>
                    
                  
                
              
            );
          })}
          </DataTable>
                    </View>
          </View>
      </ScrollView>
    </View>
    </>
  );
}

export default ViewReport;



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
