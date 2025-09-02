import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function SocialObraForm({ onCreated }) {
  const [form, setForm] = useState({
    numeroContrato: '',
    nombreCompleto: '',
    celular: '',
    correo: '',
    memorandoAceptacion: ''
  });
  const [errores, setErrores] = useState([]);

  const validar = () => {
    const errores = [];
    if (!form.numeroContrato) errores.push('El No. Contrato es obligatorio');
    if (!form.nombreCompleto) errores.push('El nombre completo es obligatorio');
    if (!form.celular) errores.push('El celular es obligatorio');
    if (!form.correo || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.correo)) errores.push('Correo inválido');
    if (!/^[0-9]+$/.test(form.memorandoAceptacion)) errores.push('Memorando debe ser solo números');
    return errores;
  };

  const handleSubmit = async () => {
    const errs = validar();
    if (errs.length) {
      setErrores(errs);
      return;
    }
    const res = await fetch('http://localhost:4000/api/asociar/social-obra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ numeroContrato: '', nombreCompleto: '', celular: '', correo: '', memorandoAceptacion: '' });
      setErrores([]);
      onCreated && onCreated();
    } else {
      const data = await res.json();
      setErrores(data.errores || ['Error al asociar']);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {errores.map((e, i) => <Text key={i} style={{ color: 'red' }}>{e}</Text>)}
      <Text>No. Contrato</Text>
      <TextInput value={form.numeroContrato} onChangeText={v => setForm({ ...form, numeroContrato: v })} />
      <Text>Nombre Completo</Text>
      <TextInput value={form.nombreCompleto} onChangeText={v => setForm({ ...form, nombreCompleto: v })} />
      <Text>Celular</Text>
      <TextInput value={form.celular} onChangeText={v => setForm({ ...form, celular: v })} keyboardType="phone-pad" />
      <Text>Correo Electrónico</Text>
      <TextInput value={form.correo} onChangeText={v => setForm({ ...form, correo: v })} keyboardType="email-address" />
      <Text>Memorando de Aceptación</Text>
      <TextInput value={form.memorandoAceptacion} onChangeText={v => setForm({ ...form, memorandoAceptacion: v })} keyboardType="numeric" />
      <Button title="Asociar" onPress={handleSubmit} />
    </View>
  );
}