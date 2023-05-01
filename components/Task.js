import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Icon
                    name={props.checked ? "check-circle" : "circle"}
                    size={24}
                    color="#4754CD"
                    style={{ marginRight: 10 }}
                    onPress={props.setChecked}
                />
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={props.delete}>
                <Icon style={styles.deleteIcon} name='trash-2' size={24} />
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
        marginBottom: 15,
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
        color: '#4754CD',
    },
})

export default Task;