import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function Tarefas({ data, deletar, selecionar }) {

    return(
        <View style={styles.container}>
            
            <TouchableOpacity style={{marginRight: 10}} onPress={() => deletar(data.key)}>
                <MaterialCommunityIcons name="delete" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={{paddingRight: 10}} onPress={() => selecionar(data)}>
                <Text style={{color: '#FFF', paddingRight: 10}}>
                    {data.nome}
                </Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#b57eff',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4
    }
});