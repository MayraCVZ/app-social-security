import React, { useState } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MateriaScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const handleDateChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  
  const showTimePicker = () => {
    setShowTime(true);
  };

  const formatSelectedDate = () => {
    // Aquí puedes ajustar el formato de la fecha según tus necesidades
    return selectedDate.toISOString().split('T')[0];
  };

  return (
    <View>
      <Button onPress={showDateTimePicker} title="Seleccionar fecha" />
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        value={formatSelectedDate()}
        editable={false}
        placeholder="Fecha seleccionada"
      />
      
      <Button onPress={showTimePicker} 
      title="Seleccionar hora" />
      {showTime && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          is24Hour={true}
          display="clock"
          //onChange={handleDateChange}
        />
      )}
      <TextInput
        value={formatSelectedDate()}
        editable={false}
        placeholder="Fecha seleccionada"
      />

    </View>

    
  );
};
export default MateriaScreen;
/*import React from "react";
import { View, Text } from "react-native";

export default function MateriaScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Pantalla materias</Text>
      <Text>Contenido</Text>
    </View>
  );
}*/
