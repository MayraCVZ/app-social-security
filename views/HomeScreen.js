import React, { useEffect, useState } from "react";
import {
  FlatList, View, Text, SafeAreaView,
  TouchableOpacity, StyleSheet, Alert, RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from "../hooks/useAuth";
import config from "../config";



export default function HomeScreen({ navigation }) {
  const { auth, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [agenda, setAgenda] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getAgendaData();
      console.log("reloaded");
    });
  }, [navigation]);

  const getAgendaData = async () => {
    try {
      //   const headers = { "Content-Type": "application/json" };
      let response = await fetch(config.apiUrl + "/agenda");
      let data = await response.json();
      setAgenda(data);
      //console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAgendaData = async (id) => {
    setLoading(true);
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    fetch(config.apiUrl + "/agenda/" + id, {
      method: "DELETE",
      headers: myHeaders,
      /*body: JSON.stringify({
        nomAlumno: alumno.nomAlumno,
        edad: parseInt(alumno.edad),
      }),*/
    })
      .then((response) => {
        setLoading(false);
        response.text();
      })
      .then((result) => {
        Alert.alert("", "Cita cancelada")
        getAgendaData();
        console.log("Result");
        console.log(result);
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });

  };
  useState(() => {
    getAgendaData();
  }, []);

  /* const dummyArray = [
     { id: '6', nombre: 'Angel Marquez', numExpediente: '006/2023', tipoCita: 'Cobros', fecha: '12/06/2023', hora: '', comentario: '16:30' },
     { id: '7', nombre: 'Ana Valle', numExpediente: '009/2023', tipoCita: 'Firma de poder notarial', fecha: '12/06/2023', hora: '17:30', comentario: '' },
  ];*/

  const ItemView = ({ item }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.itmTitle} onPress={() => getItem(item)}>{item.nombre}</Text>

        <Text>{item.tipoCita}</Text>
        <Text>{item.fecha} - {item.hora}</Text>
        <TouchableOpacity style={styles.fabU} onPress={() => navigation.navigate("ActualizarCita", { item: item })}>
          <Icon name='ios-create-sharp' fill='black' width={25} height={27} style={styles.fabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab} onPress={() => handleDelete(item)}>
          <Icon name='trash' fill='black' width={24} height={24} style={styles.fabIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 2, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  /*const getItem = (item) => {
    //Function for click on an item
    //alert('Id : ' + item.id + ' nombre : ' + item.nombre);
  };*/

  const handleDelete = (item) => {
    Alert.alert("Cancelar cita", "Esta seguro que quiere cancelar la cita con " + item.nombre + "?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          deleteAgendaData(item.idAgenda)
          /*var index = dummyArray.indexOf(item);
          if (index !== -1) {
            dummyArray.splice(index, 1);
          }*/
        },
      },
    ]);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    //wait(2000).then(() => setRefreshing(false));
    getAgendaData();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={agenda}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D4EDF9',
    padding: 20,
    marginVertical: 8,
    //flexDirection: "row",
    justifyContent: "space-between",
    //alignItems: "center",
    borderRadius: 5,
    flex: 1
    //marginTop: StatusBar.currentHeight || 0
    /* justifyContent: 'center',*/
  },
  itmTitle: {
    color: "black",
    fontSize: 20
  },
  item: {
    padding: 10,
    fontSize: 18
  },
  fab: {
    position: 'absolute',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 5,
    backgroundColor: 'red',
    borderRadius: 20,
    elevation: 8
  },
  fabU: {
    position: 'absolute',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    right: 70,
    bottom: 5,
    backgroundColor: '#fae06e',
    borderRadius: 20,
    elevation: 8
  },
  fabIcon: {
    fontSize: 25,
    color: 'white'
  }
});

