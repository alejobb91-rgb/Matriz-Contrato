import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getContratos } from '../services/contratoApi';

export default function ListaContratosScreen({ navigation }) {
  const [contratos, setContratos] = useState([]);

  const fetchContratos = async () => {
    const data = await getContratos();
    setContratos(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchContratos();
    }, [])
  );

  return (
    <View>
      <Button title="Crear Contrato" onPress={() => navigation.navigate('CrearContrato')} />
      <FlatList
        data={contratos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Text>{item.numeroContrato} - {item.nombreContratista}</Text>
        )}
      />
    </View>
  );
}