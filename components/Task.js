import React, {useState} from 'react';
import { Switch, Touchable, TouchableOpacity } from "react-native";
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Task = (props) => {
    const [state, setState] = useState(false);
    const toggleSwitch = () => setState(previousState => !previousState);

    const deleteTask = () => {
        console.log(props);   
    }
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Switch 
                    onValueChange={toggleSwitch}
                    value={state}
                >
                </Switch>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity style={styles.delete} onPress={() => deleteTask()}>
                <Icon name='circle-with-cross' size={20} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55bcf6',
        opacity: 0.4,
        marginRight: 15,
        borderRadius: 5,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemText: {
        maxWidth: '80%',
    },
    circle: {},
})

export default Task;