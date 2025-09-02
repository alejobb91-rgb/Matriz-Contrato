import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const subdirecciones = [
  'SGDU', 'SGI', 'DTINI', 'DTP', 'DTC', 'DTCI', 'DTAI',
  'STEP', 'STED', 'STAP', 'STGSV', 'STESV', 'STEST', 'STCSV', 'STCST'
];

export default function TecnicoIDUForm({ onCreated }) {
  const [form, setForm] = useState({
    numeroContrato: '',
    subdireccionResponsable: subdirecciones[0],
    nombreCompleto: '',
    celular: '',
    correo: ''
  });
  const [errores, setErrores] = useState([]);

  const validar = () => {
    const errores = [];
    if (!form.numeroContrato) errores.push('El No. Contrato es obligatorio');
    if (!form.subdireccionResponsable) errores.push('La subdirección responsable es obligatoria');
    if (!form.nombreCompleto) errores.push('El nombre completo es obligatorio');
    if (!form.celular) errores.push('El celular es obligatorio');
    if (!form.correo || !/^[a-zA-Z0-9._%+-]+@idu\.gov\.co$/.test(form.correo)) errores.push('Correo debe ser tipo xxxx@idu.gov.co');
    return errores;
  };

  const handleSubmit = async () => {
    const errs = validar();
    if (errs.length) {
      setErrores(errs);
      return;
    }
    const res = await fetch('http://localhost:4000/api/asociar/tecnico-idu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ numeroContrato: '', subdireccionResponsable: subdirecciones[0], nombreCompleto: '', celular: '', correo: '' });
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
      <Text>Subdirección Responsable</Text>
      <Picker selectedValue={form.subdireccionResponsable} onValueChange={v => setForm({ ...form, subdireccionResponsable: v })}>
        {subdirecciones.map(d => <Picker.Item key={d} label={d} value={d} />)}
      </Picker>
      <Text>Nombre Completo</Text>
      <TextInput value={form.nombreCompleto} onChangeText={v => setForm({ ...form, nombreCompleto: v })} />
      <Text>Celular</Text>
      <TextInput value={form.celular} onChangeText={v => setForm({ ...form, celular: v })} keyboardType="phone-pad" />
      <Text>Correo Electrónico (xxxx@idu.gov.co)</Text>
      <TextInput value={form.correo} onChangeText={v => setForm({ ...form, correo: v })} keyboardType="email-address" />
      <Button title="Asociar" onPress={handleSubmit} />
    </View>
  );
}