import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Task from './components/Task';

const App = () => {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [status, setStatus] = useState("all");

  // function to add a new task to the tasks list
  handleAddTask = () => {
    Keyboard.dismiss();
      if (value.length > 0) { // check if the input value is not empty
        setTasks([...tasks, { text: value, key: Date.now(), checked:false }]) // add the new task to the tasks list
        setValue('')// clear the input value
        filterByStatus(status); // update filtered tasks immediately after adding a new task
      }
  }

  // function to delete a task from the tasks list
  handleDeleteTask = (id) => {
    setTasks( tasks.filter((task) => {
        if (task.key !== id) return true
    })
  )
    filterByStatus(status);
  }

  // function to toggle the checked status of a task
  handleChecked = (id) => {
      setTasks( tasks.map((task) => {
        if (task.key === id) task.checked = !task.checked; // toggle the checked status of the task with the given id
          return task;
        })
    )
    filterByStatus(status);
  }

  // function to filter tasks by status (all, complete (=checked), active (=notchecked))
  filterByStatus = (status) => {
    setStatus(status);
    if (status === "checked") {
      setFilteredTasks(tasks.filter((task) => task.checked === true));
    } else if (status === "notchecked") {
      setFilteredTasks(tasks.filter((task) => task.checked === false));
    } else {
      setFilteredTasks(tasks);
    }
  }

  // update filtered tasks after changes to the tasks list or filter status
  useEffect(() => {
    filterByStatus(status);
  }, [tasks, status]);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}> To Do App </Text>
        <View style={styles.filtersWrapper}>
          <TouchableOpacity
            style={[styles.filterButton, status === "all" && styles.active]}
            onPress={() => filterByStatus("all")}
          >
            <Text style={[styles.filterText, status === "all" && styles.activeText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, status === "notchecked" && styles.active]}
            onPress={() => filterByStatus("notchecked")}
          >
            <Text style={[styles.filterText, status === "notchecked" && styles.activeText]}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, status === "checked" && styles.active]}
            onPress={() => filterByStatus("checked")}
          >
            <Text style={[styles.filterText, status === "checked" && styles.activeText]}>Complete</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.items}>
          {filteredTasks.map((task) => {
              return (
                <Task 
                  text={task.text} 
                  key={task.key} 
                  checked={task.checked}
                  setChecked={() => handleChecked(task.key)}
                  delete={() => handleDeleteTask(task.key)}
                />
              );
            })}
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
  filtersWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C2CFEA',
    color: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 14,
  },
  filterText: {
    color: '#051F5F',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
  },
  active: {
    backgroundColor: '#051F5F',
  },
});

export default App