import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  Keyboard,
  FlatList } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Login from './src/components/Login';
import Tarefas from './src/components/Tarefas';

import firebase from './src/connection/firebase';

export default function App() {

  const [usuario, setUsuario] = useState(null);

  const [novaTarefa, setNovaTarefa] = useState('');
  const [key, setKey] = useState('');

  const [tarefas, setTarefas] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {

    function obterTarefasPorUsuario() {
      if(!usuario) {
        return;
      }

      firebase.database().ref('tarefas').child(usuario).once('value', (snapshot) => {
        setTarefas([]);

        snapshot.forEach((item) => {
          let data = {
            key: item.key,
            nome: item.val().nome
          }

          setTarefas(oldTarefas => [...oldTarefas, data]);
        });
      });
    }

    obterTarefasPorUsuario();

  }, [usuario]);

  if(!usuario) {
    return <Login changeStatus={(usuario) => setUsuario(usuario)}/>;
  }

  function deletarTarefa(key) {
    firebase.database().ref('tarefas').child(usuario).child(key).remove()
    .then(() => {
      const tarefasFiltrada = tarefas.filter(item => item.key !== key);
      setTarefas(tarefasFiltrada);
    })
  }

  function editarTarefa() {
    firebase.database().ref('tarefas').child(usuario).child(key).update({
      nome: novaTarefa
    })
    .then(() => {
      const tarefaIndex = tarefas.findIndex(item => item.key === key);
      let tarefasClone = tarefas;
      tarefasClone[tarefaIndex].nome = novaTarefa;

      setTarefas([...tarefasClone]);
    });

    Keyboard.dismiss();
    setNovaTarefa('');
    setKey('');
  }

  function adicionarTarefa() {
    if(novaTarefa === '') {
      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(usuario);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome: novaTarefa
    })
    .then(() => {
      const data = {
        key: chave,
        nome: novaTarefa
      };

      setTarefas(oldTarefas => [...oldTarefas, data]);
    })
    .catch(() => {
      alert('Ops, ocorreu um erro');
    });

    setNovaTarefa('');
  }

  function selecionarTarefa(data) {
    setKey(data.key);
    setNovaTarefa(data.nome);
    inputRef.current.focus();
  }

  function cancelarEdicao() {
    setKey('');
    setNovaTarefa('');
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container}>
      
      { key .length > 0 && 
        <View style={styles.containerCancelarEdicao}>

          <TouchableOpacity onPress={cancelarEdicao}>
            <MaterialCommunityIcons name="close-circle" size={24} color="#FF0000" />
          </TouchableOpacity>

          <Text style={{ marginLeft: 5, color: '#FF0000'}}> 
            Você está editando uma tarefa
          </Text>
          
        </View>   
      }
      
      <View style={styles.containerTask}>
        <TextInput 
          style={styles.input}
          placeholder="O que você vai fazer hoje"
          value={novaTarefa}
          onChangeText={ (tarefa) => setNovaTarefa(tarefa) }
          ref={inputRef}
        />

        <TouchableOpacity 
          style={styles.botaoAdicionarTarefa} 
          onPress={key ? editarTarefa : adicionarTarefa}
        >
          <MaterialCommunityIcons name="check" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={tarefas}
        keyExtractor={item => item.key}
        renderItem={ ({ item }) => (
          <Tarefas data={item} deletar={deletarTarefa} selecionar={selecionarTarefa}/>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2f6fc',
    paddingTop: 25,
    paddingHorizontal: 10
  },
  containerTask: {
    flexDirection: 'row',
  },
  containerCancelarEdicao: { 
    flexDirection: 'row', 
    marginBottom: 15, 
    alignItems: 'center' 
  },
  input: {
    flex: 1,
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45
  },
  botaoAdicionarTarefa: {
    backgroundColor: '#ff5a87',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 15,
    borderRadius: 5
  }
});
