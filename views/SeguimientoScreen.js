import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet, Platform, View, Alert } from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList, onSelect } from 'react-native-dropdown-select-list';

import Layout from "../components/Layout";
import config from "../config";

const SeguimientoScreen = ({ navigation, route }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState("");
  //const [selectedId, setSelectedId] = useState('');
  const [clientes, setClientes] = useState();
  const [loading, setLoading] = useState(false);
  const [detalle, setDetalle] = useState({
    nombre: "",
    numExpediente: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    detalles: ""
  });

  console.log(selected);

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

  useEffect(() => {
    navigation.addListener('focus', () => {
      setDetalle({
        nombre: "",
        numExpediente: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        detalle: ""
      })
      setSelected('');
      setSelectedDate(new Date());
    });
  }, [navigation]);

  const handleSubmit = async () => {
    detalle.nombre = selected;
    detalle.fecha = formatSelectedDate();
    setLoading(true);
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    fetch(config.apiUrl + "/seguimientoAsuntos", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        nombre: detalle.nombre,
        numExpediente: parseInt(detalle.numExpediente),
        fecha: detalle.fecha,
        horaInicio: detalle.horaInicio,
        horaFin: detalle.horaFin,
        detalle: detalle.detalles
      }),
    })
      .then((response) => {
        setLoading(false);
        response.text();
      })
      .then((result) => {
        Alert.alert("", "Registro guardado.")
        setDetalle({
          nombre: "",
          numExpediente: "",
          fecha: "",
          horaInicio: "",
          horaFin: "",
          detalle: ""
        })
        setSelected('');
        setSelectedDate(new Date());
        console.log("Result");
        console.log(result);
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  };

  const handleChange = (name, value) => setDetalle({ ...detalle, [name]: value });

  return (
    <Layout>
      <Text style={styles.text}>Cliente</Text>
      <SelectList
        boxStyles={styles.input}
        setSelected={(values) => {
          setSelected(values)
        }}
        data={clientes}
        save="value"
        placeholder="Seleccione un cliente"
        placeholderTextColor="#576574"

        onChangeText={(text) => handleChange("nombre", text)}
      /*onSelect={(item) => {
        console.log(item)
        //setSelected(values[0]?.value || ''); // Obtiene el valor seleccionado
        //setSelectedId(values[0]?.key || ''); // Obtiene el ID seleccionado
      }}*/
      //value={[{ key: selectedId, label: selected }]}
      /*onChange={(values) => {
        console.log(values)
      }}*/
      />

      <Text style={styles.text}>Expediente</Text>
      <TextInput
        style={styles.input}
        placeholder="Expediente"
        placeholderTextColor="#576574"
        value={detalle.numExpediente}
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
        //value={detalle.fecha}
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
        value={detalle.horaInicio}
        onChangeText={(text) => handleChange("horaInicio", text)}
      />

      <Text style={styles.text}>Hora Fin</Text>
      <TextInput
        style={styles.input}
        placeholder="hh:mm"
        placeholderTextColor="#576574"
        value={detalle.horaFin}
        onChangeText={(text) => handleChange("horaFin", text)}
      />

      <Text style={styles.text}>Seguimiento</Text>
      <TextInput
        style={styles.inputArea}
        placeholder="Escriba los comentarios"
        placeholderTextColor="#576574"
        multiline={true}
        numberOfLines={4}
        value={detalle.detalles}
        onChangeText={(text) => handleChange("detalles", text)}
      />

      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
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
    color: "black",
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

