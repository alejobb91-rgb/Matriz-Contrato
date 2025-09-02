import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Linking } from 'react-native';
import { getContracts, getContractPdfUrl } from '../services/api';
import ContractForm from '../components/ContractForm';

export default function ContractsScreen() {
  const [contracts, setContracts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getContracts().then(setContracts);
  }, []);

  const handleContractCreated = (newContract) => {
    setContracts([...contracts, newContract]);
    setShowForm(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Contratos</Text>
      <Button title="Nuevo Contrato" onPress={() => setShowForm(true)} />
      {showForm && <ContractForm onCreated={handleContractCreated} onCancel={() => setShowForm(false)} />}
      <FlatList
        data={contracts}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.nombre} - {item.cliente}</Text>
            <Button title="Ver PDF" onPress={() => Linking.openURL(getContractPdfUrl(item._id))} />
          </View>
        )}
      />
    </View>
  );
}