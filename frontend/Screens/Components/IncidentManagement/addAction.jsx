import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Icon } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { updatedata } from "./context/ContextProvider";
import { BASE_URL } from "../constants/Url.json";
import axios from "axios";

export default function AddAction({ navigation }) {
    const [incident, setIncident] = useState("");
    const [id, setId] = useState("");
    const [action, setAction] = useState("");

    useEffect(() => {
    getdata()
}, [])

const handleEdit = (item) => {
    var data = {
        "incident" : incident,
        "id": id,
        "action" : action
    }
    axios({
        url:BASE_URL + `/incident/update/${id}`,
        method:"PUT",
        data : data,
        headers : {
            "Content-Type" : "application/json"
        }
    }).then((res) => {
        console.log(data);
        getdata();
        
        setIncident(item.incident)
        setId(item.id)
        setAction(item.action)
        
        console.log(data);
    })
}

const getdata = async () => {
    const res = await fetch(BASE_URL + `/incident/view/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
        console.log("Please take the action");
        return 0;
    } else {
        setIncident(data.incident);
        setId(data.id);
        setAction(data.action);
        console.log("get data");
        console.log(data);
    }
};

const onChangeActionName = (value) => {
    setAction(value)
        }

    return (


        <View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ViewAllIncidents", {})}
                >
                    <Icon name="chevron-left" color="black" iconStyle={styles.icon} />
                </TouchableOpacity>
            <Text style={styles.TextTitle1}>Take Action</Text>
        </View>

        <Card.Divider color="black" style={{ height: 4 }} />

        <View style={styles.container1}>
            <Text style={styles.text1}>Referrence No : {id}</Text>
       

        <Text style={styles.text1}>Vehicle No</Text>
                

        <Text style={styles.text1}>Owner Name</Text>
                

        <Text style={styles.text1}>Passenger Name</Text>

        <Text style={styles.text1}>Incident</Text>
        
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            
            placeholderTextColor="#003f5c"
                value={action}
            name='action'
            onChangeText={onChangeActionName}
            />
        </View>
        
        

        <Card.Divider color="black" style={{ height: 4, marginTop: 10 }} />

            <View style={styles.row}>
            <TouchableOpacity style={styles.resetBtn} 
                onPress={() =>
                navigation.navigate("ViewAllIncidents", { screen: "ViewAllIncidents" })
            }>
                <Text style={styles.resetText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={AddAction}>
                <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { fontSize: 35 },
  TextTitle1: {
    marginTop: 40,
    marginLeft: 10,
    fontSize: 40,
  },
  container1: {
    backgroundColor: "#D5BEFF",
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D5BEFF",
    borderRadius: 25,
    height: "77%",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 30,
    marginRight: 15
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
    borderColor: "#8B51F5",
  },
  addBtn: {
    width: "40%",
    borderRadius: 25,
    marginLeft: 20,
    marginBottom: 20,
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
    borderWidth: 5,
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#8B51F5",
    backgroundColor: "white",
  },
});
