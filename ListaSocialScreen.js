import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getSociales } from '../services/socialApi';

export default function ListaSocialScreen({ navigation }) {
  const [sociales, setSociales] = useState([]);

  const fetchSociales = async () => {
    const data = await getSociales();
    setSociales(data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchSociales();
    }, [])
  );

  return (
    <View>
      <Button title="Crear Social" onPress={() => navigation.navigate('CrearSocial')} />
      <FlatList
        data={sociales}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Text>{item.cedula} - {item.nombre}</Text>
        )}
      />
    </View>
  );
}