import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function SituacionCriticaForm({ onCreated }) {
  const [form, setForm] = useState({
    numeroContrato: '',
    fechaSituacionCritica: '',
    situacionCritica: ''
  });
  const [errores, setErrores] = useState([]);

  const validar = () => {
    const errs = [];
    if (!form.numeroContrato) errs.push('No. Contrato es obligatorio');
    if (!form.fechaSituacionCritica) errs.push('Fecha Situación Crítica es obligatoria');
    if (!form.situacionCritica) errs.push('Situación Crítica es obligatoria');
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validar();
    if (errs.length) {
      setErrores(errs);
      return;
    }
    const res = await fetch('http://localhost:4000/api/situaciones-criticas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ numeroContrato: '', fechaSituacionCritica: '', situacionCritica: '' });
      setErrores([]);
      onCreated && onCreated();
      Alert.alert('¡Éxito!', 'Situación crítica registrada');
    } else {
      const data = await res.json();
      setErrores(data.errores || ['Error al registrar']);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {errores.map((e, i) => <Text key={i} style={{ color: 'red' }}>{e}</Text>)}
      <Text>No. Contrato</Text>
      <TextInput value={form.numeroContrato} onChangeText={v => setForm({ ...form, numeroContrato: v })} />
      <Text>Fecha Situación Crítica</Text>
      <TextInput value={form.fechaSituacionCritica} onChangeText={v => setForm({ ...form, fechaSituacionCritica: v })} placeholder="YYYY-MM-DD" />
      <Text>Situación Crítica</Text>
      <TextInput value={form.situacionCritica} onChangeText={v => setForm({ ...form, situacionCritica: v })} multiline />
      <Button title="Registrar" onPress={handleSubmit} />
    </View>
  );
}