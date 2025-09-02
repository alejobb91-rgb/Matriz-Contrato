import React from 'react';
import CrearSocialForm from '../components/CrearSocialForm';

export default function CrearSocialScreen({ navigation }) {
  return <CrearSocialForm onCreated={() => navigation.goBack()} />;
}