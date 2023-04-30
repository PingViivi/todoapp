import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Task from './components/Task';

const App = () => {
  const [value, setValue] = useState('')
  const [tasks, setTasks] = useState([]);
  const Tab = createBottomTabNavigator();

  const handleAddTask = () => {
    Keyboard.dismiss();
      if (value.length > 0) {
        setTasks([...tasks, { text: value, key: Date.now(), checked:false }])
        setValue('')
      }
  }

  handleDeleteTask = (id) => {
    setTasks( tasks.filter((task) => {
        if (task.key !== id) return true
    })
  )}

  handleChecked = (id) => {
    setTasks( tasks.map((task) => {
       if (task.key === id) task.checked = !task.checked;
         return task;
       })
  )}

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}> To Do App </Text>
        <ScrollView syle={styles.items}>
          {
            tasks.map((task) => {
              return (
                <Task 
                  text={task.text} 
                  key={task.key} 
                  checked={task.checked}
                  setChecked={() => handleChecked(task.key)}
                  delete={() => handleDeleteTask(task.key)}
                />
              )
            })
          }
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'write a task'} value={value} onChangeText={(value) => setValue(value)}/>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              <Icon  name='add-outline' size={24}></Icon>
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    maxHeight: '82%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 260,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#051F5F',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#fff',
  },

});

export default App