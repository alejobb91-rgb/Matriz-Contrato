import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const tiposContrato = ['Conservación', 'Troncal', 'Vial', 'E.Previas', 'E&D'];
const manuales = [
  'Manual Interventoria V6',
  'Manual Interventoria V7',
  'Manual Interventoria V8',
  'Manual Interventoria V9',
  'Manual Interventoria V10'
];
const complejidades = ['Baja', 'Media', 'Alta'];

export default function TpoContratoForm({ onCreated }) {
  const [form, setForm] = useState({
    numeroContrato: '',
    tipoContrato: tiposContrato[0],
    objetoContrato: '',
    nombreContratista: '',
    numeroContratoInterventoria: '',
    nombreContratistaInterventoria: '',
    manualInterventoria: manuales[0],
    complejidad: complejidades[0]
  });
  const [errores, setErrores] = useState([]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const validar = () => {
    const errores = [];
    const patron = /^IDU-\d{4}-\d{4}$/;
    if (!form.numeroContrato || !patron.test(form.numeroContrato)) {
      errores.push('El No. Contrato es obligatorio y debe ser del tipo IDU-XXXX-YYYY');
    }
    if (!form.objetoContrato) errores.push('El objeto del contrato es obligatorio');
    if (!form.nombreContratista) errores.push('El nombre del contratista es obligatorio');
    if (!form.numeroContratoInterventoria || !patron.test(form.numeroContratoInterventoria)) {
      errores.push('El No. Contrato Interventoria es obligatorio y debe ser del tipo IDU-XXXX-YYYY');
    }
    if (!form.nombreContratistaInterventoria) errores.push('El nombre del contratista de interventoría es obligatorio');
    return errores;
  };

  const handleSubmit = async () => {
    const erroresVal = validar();
    if (erroresVal.length) {
      setErrores(erroresVal);
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/crear/tpo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert('Éxito', 'Contrato TPO creado');
        setForm({
          numeroContrato: '',
          tipoContrato: tiposContrato[0],
          objetoContrato: '',
          nombreContratista: '',
          numeroContratoInterventoria: '',
          nombreContratistaInterventoria: '',
          manualInterventoria: manuales[0],
          complejidad: complejidades[0]
        });
        setErrores([]);
        if (onCreated) onCreated();
      } else {
        setErrores(data.errores || ['Error al crear']);
      }
    } catch {
      setErrores(['Error de conexión']);
    }
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      {errores.length > 0 && errores.map((e, i) => <Text key={i} style={{ color: 'red' }}>{e}</Text>)}
      <Text>No. Contrato (IDU-XXXX-YYYY)</Text>
      <TextInput value={form.numeroContrato} onChangeText={v => handleChange('numeroContrato', v)} />
      <Text>Tipo de Contrato</Text>
      <Picker selectedValue={form.tipoContrato} onValueChange={v => handleChange('tipoContrato', v)}>
        {tiposContrato.map(tc => <Picker.Item key={tc} label={tc} value={tc} />)}
      </Picker>
      <Text>Objeto Contrato</Text>
      <TextInput value={form.objetoContrato} onChangeText={v => handleChange('objetoContrato', v)} multiline />
      <Text>Nombre Contratista</Text>
      <TextInput value={form.nombreContratista} onChangeText={v => handleChange('nombreContratista', v)} />
      <Text>No. Contrato Interventoria (IDU-XXXX-YYYY)</Text>
      <TextInput value={form.numeroContratoInterventoria} onChangeText={v => handleChange('numeroContratoInterventoria', v)} />
      <Text>Nombre Contratista Interventoria</Text>
      <TextInput value={form.nombreContratistaInterventoria} onChangeText={v => handleChange('nombreContratistaInterventoria', v)} />
      <Text>Manual Interventoria</Text>
      <Picker selectedValue={form.manualInterventoria} onValueChange={v => handleChange('manualInterventoria', v)}>
        {manuales.map(m => <Picker.Item key={m} label={m} value={m} />)}
      </Picker>
      <Text>Complejidad</Text>
      <Picker selectedValue={form.complejidad} onValueChange={v => handleChange('complejidad', v)}>
        {complejidades.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>
      <Button title="Crear Contrato" onPress={handleSubmit} />
    </ScrollView>
  );
}