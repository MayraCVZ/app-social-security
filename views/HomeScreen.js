import React from "react";
import {
  FlatList, View, Text, SafeAreaView,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";


const HomeScreen = ({ navigation, route }) => {

const dummyArray = [
  { id: '1', nombre: 'Pedro Perez', numExpediente: '002/2023', tipoCita: 'Pago de honorarios', fecha: '12/06/2023', hora: '10:30', comentario: '' },
  { id: '2', nombre: 'Claudia Lopez', numExpediente: '004/2023', tipoCita: 'Firma de poder notarial', fecha: '12/06/2023', hora: '11:20', comentario: '' },
  { id: '3', nombre: 'Hector gonzalez', numExpediente: '001/2023', tipoCita: 'Recoleccion de documentos', fecha: '12/06/2023', hora: '12:30', comentario: '' },
  { id: '4', nombre: 'Mauricio Hernandez', numExpediente: '007/2023', tipoCita: 'Afores', fecha: '12/06/2023', hora: '13:30', comentario: '' },
  { id: '5', nombre: 'Daniel Guzman', numExpediente: '005/2023', tipoCita: 'Diagnostico', fecha: '12/06/2023', hora: '14:00', comentario: '' },
  { id: '6', nombre: 'Angel Marquez', numExpediente: '006/2023', tipoCita: 'Cobros', fecha: '12/06/2023', hora: '', comentario: '16:30' },
  { id: '7', nombre: 'Ana Valle', numExpediente: '009/2023', tipoCita: 'Firma de poder notarial', fecha: '12/06/2023', hora: '17:30', comentario: '' },
  { id: '8', nombre: 'Julio Cazas', numExpediente: '003/2023', tipoCita: 'Pension', fecha: '12/06/2023', hora: '', comentario: '18:00' },
  { id: '9', nombre: 'Diana Montes', numExpediente: '012/2023', tipoCita: 'Recoleccion de documentos', fecha: '12/06/2023', hora: '', comentario: '18:30' },
  { id: '10', nombre: 'Fransisco Rio', numExpediente: '010/2023', tipoCita: 'Firmar documentos de trámites previos a la pensión', fecha: '12/06/2023', hora: '19:00', comentario: '' }

];
//const navigat = useNavigation();
//const App = () => {
// const [listItems, setListItems] = useState(dummyArray);


const ItemView = ({ item }) => {
  return (
    // Single Comes here which will be repeatative for the FlatListItems
    <View style={styles.container}>
      <Text style={styles.itmTitle} onPress={() => getItem(item)}>{item.nombre} 
      </Text>
      <Text style={{ color: "grey" }}> {item.numExpediente} </Text>
      <Text>{item.tipoCita}</Text>
      <Text>{item.fecha} - {item.hora}</Text>
      <TouchableOpacity style={styles.fabU}  onPress={() => navigation.navigate("Agenda digital", { id: item.id })}>
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
      style={{ height: 1, width: '100%', backgroundColor: '#C8C8C8' }}
    />
  );
};

const getItem = (item) => {
  //Function for click on an item
  //alert('Id : ' + item.id + ' nombre : ' + item.nombre);
};

const handleDelete = (item) => {
  //Function for click on an item
  Alert.alert("Cancelar cita", "Esta seguro que quiere cancelar la cita con" + item.nombre + "?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Ok",
      onPress: async () => {
        //await deleteTask(id);
        //await getUsers();
        alert("Cita cancelada")
        var index = dummyArray.indexOf(item);
        if (index !== -1) {
          dummyArray.splice(index, 1);
        }
        //dummyArray.pop()
      },
    },
  ]);
};


//export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View >
        <FlatList
          data={dummyArray}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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

export default HomeScreen;

/*import {View, StyleSheet, Text, FlatList} from "react-native";

const ANIMALS = ["Dog", "Cat", "Chicken", "Dragon", "Camel"];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <FlatList
      data={ANIMALS}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(animal) => {
        return (
          <View style={styles.listItem}>
            <Text>{animal.item}</Text>
          </View>
        );
      }}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    paddingTop: 100,
  },
  listItem: {
    backgroundColor: "orange",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
  },
});*/
