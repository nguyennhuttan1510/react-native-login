import { StatusBar } from 'expo-status-bar';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const STATE_SCREEN = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  CHANGE_PASSWORD: 'change_password',
};

export default function LoginScreen({navigation}) {
  const [accountList, setAccountList] = useState([{username: 'abc', password: 'abc'}])
  const [currentScreen, seCurrentScreen] = useState(STATE_SCREEN.SIGN_IN);
  const form = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log('🚀 ~ file: App.js ~ line 29 ~ App ~ values', values);
      if (currentScreen === STATE_SCREEN.SIGN_IN) {
        handleClickSignIn(values)
        return
      }
      handleClickSignUp(values)
    },
  });

  const handleClickSignIn = (values) => {
    let validAccount = accountList?.length > 0 && accountList.find((account)=> account.username === values.username )?.password === values.password
    if(validAccount) {
      navigation.navigate('HomeScreen')
    }
  };
  const handleClickSignUp = (values) => {
    const account  = {
      username: values.username,
      password: values.password,
    }
    setAccountList(prev=>[...prev, account])
  };

  const changeStateScreen = () => {
    form.handleReset()
    if (currentScreen === STATE_SCREEN.SIGN_IN) {
      seCurrentScreen(STATE_SCREEN.SIGN_UP);
      return;
    }
    seCurrentScreen(STATE_SCREEN.SIGN_IN);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.formLogin}>
        <FormikProvider {...form} value={initialValues}>
          {currentScreen === STATE_SCREEN.SIGN_IN ? (
            <>
              <Text style={styles.titleForm}>Login</Text>
              <TextInput
                style={styles.input}
                value={form.values.username}
                onChangeText={form.handleChange('username')}
                placeholder="Username"
              />
              <Text style={styles.errorMessage}>{form.touched && form.errors.username}</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={form.values.password}
                onChangeText={form.handleChange('password')}
                placeholder="Password"
              />
              <Text style={styles.errorMessage}>{form.touched && form.errors.password}</Text>
            </>
          ) : (
            <>
              <Text style={styles.titleForm}>Sign Up</Text>
              <TextInput
                style={styles.input}
                value={form.values.username}
                onChangeText={form.handleChange('username')}
                placeholder="Username"
              />
              <Text style={styles.errorMessage}>{form.touched && form.errors.username}</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={form.values.password}
                onChangeText={form.handleChange('password')}
                placeholder="Password"
              />
              <Text style={styles.errorMessage}>{form.touched && form.errors.password}</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={form.values.confirmPassword}
                onChangeText={form.handleChange('confirmPassword')}
                placeholder="Confirm Password"
              />
              <Text style={styles.errorMessage}>{form.touched && form.errors.confirmPassword}</Text>
            </>
          )}
          <TouchableOpacity
            style={[styles.button, styles.buttonBlack, { marginTop: 32 }]}
            onPress={form.handleSubmit}
          >
            {currentScreen !== STATE_SCREEN.SIGN_IN ? (
              <Text style={[styles.contextButton, { color: 'white' }]}>
                Sign Up
              </Text>
            ) : (
              <Text style={[styles.contextButton, { color: 'white' }]}>
                Sign In
              </Text>
            )}
          </TouchableOpacity>
        </FormikProvider>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={
            changeStateScreen
          }
        >
          {currentScreen === STATE_SCREEN.SIGN_IN ? (
            <Text style={[styles.contextButton, { color: 'black' }]}>
              Sign Up
            </Text>
          ) : (
            <Text style={[styles.contextButton, { color: 'black' }]}>
              Sign In
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleForm: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  formLogin: {
    display: 'flex',
    width: '70%',
    maxWidth: 275,
    justifyContent: 'center',
  },
  input: {
    maxWidth: 275,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginBottom: 2,
  },
  errorMessage: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'red',
    fontSize: 12,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  buttonBlack: {
    backgroundColor: 'black',
  },

  buttonOutline: {
    borderWidth: 1,
    borderColor: 'black',
  },

  contextButton: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

