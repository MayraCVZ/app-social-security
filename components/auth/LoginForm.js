import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Keyboard,
} from "react-native";
import { Button } from 'react-native-elements';
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";

const staticImage = require("../../assets/inicio.jpg");

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setError("");
      const { username, password } = formValue;

      if (username !== user.username || password !== user.password) {
        setError("El usuario o la contraseña no son correcto");
      } else {
        login(userDetails);
      }
    },
  });

  return (
    <View>
      <View>
        <Image
          style={styles.tinyLogo}
          source={staticImage}
        />
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          placeholder="Nombre de usuario"
          style={styles.input}
          autoCapitalize="none"
          value={formik.values.username}
          onChangeText={(text) => formik.setFieldValue("username", text)}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
      </View>

      <View /*style={styles.loginButtonSection}*/>
        <Button buttonStyle={styles.buttonLogin} title="Entrar" onPress={formik.handleSubmit} />
      </View>

      <View>
        <Text style={styles.error}>{formik.errors.username}</Text>
        <Text style={styles.error}>{formik.errors.password}</Text>

        <Text style={styles.error}>{error}</Text>
      </View>

    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const styles = StyleSheet.create({
  /* content: {
     marginHorizontal: 20,
     marginTop: 20,
     position: 'relative',
     alignItems: 'center',
     justifyContent: 'center'
   },*/
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
  /*loginButtonSection: {
    width: '100%',
    //height: '30%',
    justifyContent: 'center',
    //alignItems: 'center'
  },*/
  buttonLogin: {
    borderRadius: 20,
    //marginTop: 10,
    backgroundColor: "#0E55A7",
    elevation: 10,
    marginLeft: '15%',
    width: "70%",
  },
  tinyLogo: {
    width: '100%',
    height: '40%',
  }
});