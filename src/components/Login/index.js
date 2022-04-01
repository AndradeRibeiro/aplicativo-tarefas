import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import firebase from '../../connection/firebase';

export default function Login({ changeStatus }) {

  const [tipo, setTipo] = useState('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function enviarRequisicao() {
    if(tipo === 'login')
      login();
    else
      criarConta();  
  }

  async function login() {
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((resposta) => {
      changeStatus(resposta.user.uid);
    })
    .catch(() => {
      alert('Ops parece que algo deu errado');
    });
  }

  async function criarConta() {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((resposta) => {
      changeStatus(resposta.user.uid);
    })
    .catch(() => {
      alert('Ops parece que algo deu errado');
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <TextInput 
        placeholder='Seu email'
        style={styles.input}
        value={email}
        onChangeText={(texto) => setEmail(texto)}
      />

      <TextInput 
        placeholder='******'
        style={styles.input}
        value={senha}
        onChangeText={(texto) => setSenha(texto)}
      />

      <TouchableOpacity 
        style={styles.botaoLogin}
        onPress={enviarRequisicao}
      >
        <Text style={styles.loginTexto}>
          { tipo === 'login' ? 'Acessar' : 'Cadastrar' }
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botaoCriarConta}
        onPress={() => setTipo(tipo => tipo === 'login' ? 'cadastrar' : 'login')}
      >
        <Text style={styles.criarContaTexto}>
          { tipo === 'login' ? 'Criar uma conta' : 'Já possuo uma conta' }
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F2f6fc',
    paddingHorizontal: 10
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414'
  },
  botaoLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5a87',
    height: 45,
    marginBottom: 10
  },
  botaoCriarConta: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 10
  },
  loginTexto: {
    color: '#FFF',
    fontSize: 17
  },
  criarContaTexto: {
    color: '#141812',
    fontSize: 17
  }
});
