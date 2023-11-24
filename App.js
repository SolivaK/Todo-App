import React, { useState } from "react"; 
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
} from "react-native"; 

const App = () => { 
    const [task, setTask] = useState(""); 
    const [tasks, setTasks] = useState([]); 
    const [editIndex, setEditIndex] = useState(-1); 

    const handleAddTask = () => { 
        if (task) { 
            if (editIndex !== -1) { 
                // Edit existing task 
                const updatedTasks = [...tasks]; 
                updatedTasks[editIndex] = task; 
                setTasks(updatedTasks); 
                setEditIndex(-1); 
            } else { 
                // Add new task 
                setTasks([...tasks, task]); 
            } 
            setTask(""); 
        } 
    }; 

    const handleEditTask = (index) => { 
        const taskToEdit = tasks[index]; 
        setTask(taskToEdit); 
        setEditIndex(index); 
    }; 

    const handleDeleteTask = (index) => { 
        const updatedTasks = [...tasks]; 
        updatedTasks.splice(index, 1); 
        setTasks(updatedTasks); 
    }; 

    const renderItem = ({ item, index }) => ( 
        <View style={styles.task}> 
            <Text style={styles.itemList}>{item}</Text> 
            <View style={styles.taskButtons}> 
                <TouchableOpacity onPress={() => handleEditTask(index)}> 
                    <Text style={styles.editButton}>Edit</Text> 
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => handleDeleteTask(index)}> 
                    <Text style={styles.deleteButton}>Delete</Text> 
                </TouchableOpacity> 
            </View> 
        </View> 
    ); 

    return ( 
        <View style={styles.container}> 
            <Text style={styles.heading}>Soliva Todo List</Text> 
            <TextInput 
                style={styles.input} 
                placeholder="Todo Task"
                value={task} 
                onChangeText={(text) => setTask(text)} 
            /> 
            <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: 'yellow' }]} 
                onPress={handleAddTask}> 
                <Text style={styles.addButtonText}> 
                    {editIndex !== -1 ? "Update Task" : "Add Todo Task"} 
                </Text> 
            </TouchableOpacity> 
            <FlatList 
                data={tasks} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()} 
            /> 
        </View> 
    ); 
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 7,
    color: 'green',
  },
  input: {
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: 'white',
    width: '80%',
  },
  addButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
  addButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  task: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
    color: 'darkgreen',
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default App;
