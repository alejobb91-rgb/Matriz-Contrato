import React from 'react';
import TpoContratoForm from '../components/TpoContratoForm';

export default function TpoContratoScreen({ navigation }) {
  return <TpoContratoForm onCreated={() => navigation.goBack()} />;
}