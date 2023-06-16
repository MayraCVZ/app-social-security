import React from "react";
import { StyleSheet, View, Text } from "react-native";
import useAuth from "../../hooks/useAuth";
import { Button } from 'react-native-elements';

export default function UserData() {
  const { auth, logout } = useAuth();

  return (
    <View style={styles.content}>

      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="Username" text={auth.username} />
        <ItemMenu title="Email" text={auth.email} />
      </View>
      <View style={styles.loginButtonSection}>
        <Button title="Salir" onPress={logout} buttonStyle={styles.btnLogoun} />
      </View>
    </View>
  );
}

function ItemMenu(props) {
  const { title, text } = props;

  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:</Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
  loginButtonSection: {
    width: '100%',
    //height: '30%',
    justifyContent: 'center',
    //alignItems: 'center'
  },
  btnLogoun: {
    borderRadius: 20,
    marginTop: 40,
    backgroundColor: "#0E55A7",
    elevation: 10,
    width: "100%",
  },
});