import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, Platform, View } from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'

import Layout from "../components/Layout";
import config from "../config";

const ClientesScreen = ({ navigation, route }) => {
  //const { item } = route.params;

  const [editing, setEditing] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [clientes, setClientes] = useState();
  const [agenda, setAgenda] = useState({
    idAgenda: "",
    nombre: "",
    fecha: "",
    tipoCita: "",
    hora: "",
    comentario: ""
  });

  const getClientesData = async () => {
    try {
      //   const headers = { "Content-Type": "application/json" };
      let response = await fetch(config.apiUrl + "/clientes");
      let data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getClientesData();
  }, []);

  const data = [
    {
      key: '1', value: 'Firma de Poder Notarial'//, disabled:true
    },
    { key: '2', value: 'Cobro de Gastos' },
    { key: '3', value: 'Recepción de documentos solicitados' },
    { key: '4', value: 'Diagnostico Jurídico Pensionario' },
    { key: '5', value: 'Firmar documentos de trámites previos a la pensión' },
    { key: '6', value: 'Pensión' },
    { key: '7', value: 'AFORES' },
    { key: '7', value: 'Cobro de Honorarios' }
  ]

  /*idAgenda: item.idAgenda,
    nombre: item.nombre,
    fecha: item.fecha,
    tipoCita:item.tipoCita,
    hora:item.hora,
    comentario:item.comentario*/

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

  /*useEffect(() => {
     navigation.addListener('focus', () => {
       //console.log(route.params.item.idAgenda)
       //console.log(navigation)
       if (route.params && route.params.item.idAgenda) {
         setEditing(true);
         //navigation.setOptions({ headerTitle: "Actualizar cita" });
         (async () => {
           //const agenda = await getAgenda(route.params.id);
           setAgenda({
             idAgenda: item.idAgenda,
             nombre: item.nombre,
             fecha: item.fecha,
             tipoCita: item.tipoCita,
             hora: item.hora,
             comentario: item.comentario
           });
           setSelected(item.nombre);
           setSelectedTipo(item.tipoCita);
           setSelectedDate(new Date(item.fecha));
         })();
       }
     });
   }, [navigation]);*/

  const handleSubmit = async () => {
    try {
      if (!editing) {
        //await saveagenda(agenda);
      } else {
        console.log(route.params.id, agenda)
        //await updateagenda(route.params.id, {...agenda});
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setAgenda({ ...agenda, [name]: value });

  return (
    <Layout>
      <Text style={styles.text}>Cliente</Text>
      <SelectList
        boxStyles={styles.input}
        setSelected={(val) => setSelected(val)}
        data={clientes}
        save="value"
        placeholder="Seleccione un cliente"
        placeholderTextColor="#576574"
      />

      <Text style={styles.text}>Expediente</Text>
      <TextInput
        style={styles.input}
        placeholder="Expediente"
        placeholderTextColor="#576574"
        value={agenda.numExpediente}
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
          //value={agenda.fecha}
          onChangeText={(text) => handleChange("fecha", text)}
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
          //onChangeText={(text) => handleChange("fecha", text)}
          />
        )}
      </View>

      <Text style={styles.text}>Hora Inicio</Text>
      <TextInput
        style={styles.input}
        placeholder="hh:mm"
        placeholderTextColor="#576574"
        value={agenda.hora}
        onChangeText={(text) => handleChange("hora", text)}
      />

      <Text style={styles.text}>Tipo de cita</Text>
      <SelectList
        boxStyles={styles.input}
        setSelected={(val) => setSelectedTipo(val)}
        data={data}
        save="value"
        placeholder="Seleccione el tipo de cita"
        placeholderTextColor="#576574"
      />

      <Text style={styles.text}>Comentarios</Text>
      <TextInput
        style={styles.inputArea}
        placeholder="Escriba los comentarios"
        placeholderTextColor="#576574"
        multiline={true}
        numberOfLines={4}
        value={agenda.comentario}
        onChangeText={(text) => handleChange("comentario", text)}
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

export default ClientesScreen;
