import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, Platform, View } from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
//import { saveTask, getTask, updateTask } from "../api";
import Layout from "../components/Layout";
import { SelectList } from 'react-native-dropdown-select-list'

const SeguimientoScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = React.useState("");

  const data = [
    {
      key: '1', value: 'Pedro Perez'//, disabled:true
    },
    { key: '2', value: 'Claudia Lopez' },
    { key: '3', value: 'Hector gonzalez' },
    { key: '4', value: 'Mauricio Hernandez' },
    { key: '5', value: 'Daniel Guzman' },
    { key: '6', value: 'Angel Marquez' },
    { key: '7', value: 'Ana Valle' },
  ]

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const formatSelectedDate = () => {
    // Aquí puedes ajustar el formato de la fecha según tus necesidades
    return selectedDate.toISOString().split('T')[0];
  };

  // if (route && route.params) {
  //   navigation.setOptions({ headerTitle: "Updating Task" });
  // }

  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Updating Task" });
      /*(async () => {
        const task = await getTask(route.params.id);
        setTask({ title: task.title, description: task.description });
      })();*/
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!editing) {
        //await saveTask(task);
      } else {
        console.log(route.params.id, task)
        //await updateTask(route.params.id, {...task});
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  return (
    <Layout>
      <Text style={styles.text}>Cliente</Text>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        placeholder="Seleccione un cliente"
        placeholderTextColor="#576574"
        style={styles.input}
      />

      <Text style={styles.text}>Expediente</Text>
      <TextInput
        style={styles.input}
        placeholder="Expediente"
        placeholderTextColor="#576574"
        value={task.numExpediente}
        onChangeText={(text) => handleChange("numExpediente", text)}
      />

      <Text style={styles.text}>Fecha</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.inputCalendar}
          value={formatSelectedDate()}
          editable={false}
          placeholder="dd/mm/yyyy"
          placeholderTextColor="#576574"
        //value={task.fecha}
        //onChangeText={(text) => handleChange("fecha", text)}
        />
        <Button
          icon={
            <Icon
              name="calendar"
              size={20}
              color="white"
            />
          }
          buttonStyle={styles.buttonCalendar}
          onPress={showDateTimePicker} />
        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={handleDateChange}
          />
        )}
      </View>

      <Text style={styles.text}>Hora Inicio</Text>
      <TextInput
        style={styles.input}
        placeholder="hh:mm"
        placeholderTextColor="#576574"
        value={task.horaInicio}
        onChangeText={(text) => handleChange("horaInicio", text)}
      />

      <Text style={styles.text}>Hora Fin</Text>
      <TextInput
        style={styles.input}
        placeholder="hh:mm"
        placeholderTextColor="#576574"
        value={task.horaFin}
        onChangeText={(text) => handleChange("horaFin", text)}
      />

      <Text style={styles.text}>Seguimiento</Text>
      <TextInput
        style={styles.inputArea}
        placeholder="Escriba los comentarios"
        placeholderTextColor="#576574"
        multiline={true}
        numberOfLines={4}
        value={task.seguimiento}
        onChangeText={(text) => handleChange("seguimiento", text)}
      />

      {!editing ? (
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#0E55A7",
    height: 45,
    padding: 4,
    borderRadius: 5,
  },
  inputCalendar: {
    width: "75%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#0E55A7",
    height: 45,
    padding: 4,
    borderRadius: 5,
  },
  inputArea: {
    width: "100%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#0E55A7",
    height: 100,
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 3,
    marginTop: 40,
    backgroundColor: "#0E55A7",
    elevation: 10,
    left: 50,
    width: "70%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 3,
    marginTop: 40,
    backgroundColor: "#fae06e",
    elevation: 10,
    left: 50,
    width: "70%",
  },
  buttonCalendar: {
    borderRadius: 20,
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 10,
    backgroundColor: "#0E55A7",
    elevation: 8,
    width: "60%",
    //position: 'absolute',
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16
  },
  container: {
    width: "100%",
    flexDirection: 'row'
  }
});

export default SeguimientoScreen;

