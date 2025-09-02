import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function InformeGeneralForm() {
  const [numeroContrato, setNumeroContrato] = useState('');
  const [formato, setFormato] = useState('excel'); // 'pdf' or 'excel'

  const handleDownload = async () => {
    if (!numeroContrato) {
      Alert.alert('Error', 'Debe ingresar No. Contrato');
      return;
    }
    const url = `http://localhost:4000/api/informes/general?numeroContrato=${encodeURIComponent(numeroContrato)}&formato=${formato}`;
    // En móvil, usar Linking.openURL(url) o WebView, en web puedes usar window.open(url)
    window.open(url, "_blank");
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>No. Contrato</Text>
      <TextInput value={numeroContrato} onChangeText={setNumeroContrato} />
      <Text>Formato</Text>
      <Button title="Descargar Excel" onPress={() => { setFormato('excel'); handleDownload(); }} />
      <Button title="Descargar PDF" onPress={() => { setFormato('pdf'); handleDownload(); }} />
    </View>
  );
}