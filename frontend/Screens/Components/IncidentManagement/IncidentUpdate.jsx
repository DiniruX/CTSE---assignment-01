import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../constants/Url.json";

const Incident = () => {
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [incident, setIncident] = useState("");

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
axios({
    url:"",
    method:"GET"
}).then((res) => {
    var response = res.data;
    setList(response.data)
})
    }

    const handleSave = () => {
        var data = {
            "incident" : incident
        }
        axios({
            url:"http://192.168.125.248:8000/incident/new",
            method:"POST",
            data : data,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            console.log(data);
            getList();
            setIncident("")
            // setVisible(false)
            console.log(data);
        })
    }

    const handleDelete = (item) => {
        axios({
            url:"",
            method:"DELETE"
        }).then((res) => {
            var response = res.data;
            getList();
        })
    }

    const handleEdit = (item) => {
        var data = {
            "incident" : incident
        }
        axios({
            url:"http://192.168.125.248:8000/incident/update/636ae3df7a2c620b602e3143",
            method:"PATCH",
            data : data,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            console.log(data);
            getList();
            //setIncident("")
            setIncident(item.incident)
            // setVisible(false)
            console.log(data);
        })

    }

    const handleVisibleModal = () => {
        setVisible(!visible)
    }

    const onChangeIncidentName = (value) => {
setIncident(value)
    }

    return (
        <SafeAreaView>
            <View>
                <Text>{list.length}</Text>
                <TouchableOpacity onPress={handleVisibleModal}>
                    <Text>New Incident</Text>
                </TouchableOpacity>
            </View>
            <Modal>
                <SafeAreaView>
                    <View>
                        <TouchableOpacity>
                            <Text>Close</Text>
                        </TouchableOpacity>
                        <Text>{incident}</Text>
                        <TextInput 
                        value={incident}
                        onChangeText={onChangeIncidentName}></TextInput>
                        <TouchableOpacity onPress={handleEdit}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
            <ScrollView>
                {list.map((item, index) => {
                    return(
                        <View>
                            <View>
                                <Text>{index.id}</Text>
                                <Text>{index.incident}</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => handleDelete(item)}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=>handleEdit(item)}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Incident;

const styles = StyleSheet.create({

})