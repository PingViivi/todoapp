import React, {useState} from 'react';
import { Switch, Touchable, TouchableOpacity } from "react-native";
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Task = (props) => {
    const [state, setState] = useState(false);
    const toggleSwitch = () => setState(previousState => !previousState);

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Switch 
                    onValueChange={toggleSwitch}
                    value={state}
                    style={styles.switch}
                >
                </Switch>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => props.delete(props.id)}>
                <Icon style={styles.deleteIcon} name='trash-outline' size={24} />
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
    switch: {
        marginRight: 15,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemText: {
        maxWidth: '80%',
    },
    deleteIcon: {
        color: '#969696',
    },
})

export default Task;