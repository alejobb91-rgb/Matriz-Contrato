import React from 'react';
import { View, Button } from 'react-native';

export default function MenuCrearScreen({ navigation }) {
  return (
    <View style={{ padding: 16 }}>
      <Button title="Crear Contrato" onPress={() => navigation.navigate('CrearContrato')} />
      <Button title="Crear Social" onPress={() => navigation.navigate('CrearSocial')} />
    </View>
  );
}