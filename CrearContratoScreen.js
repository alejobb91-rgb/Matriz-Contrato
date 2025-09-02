import React from 'react';
import CrearContratoForm from '../components/CrearContratoForm';

export default function CrearContratoScreen({ navigation }) {
  return <CrearContratoForm onCreated={() => navigation.goBack()} />;
}