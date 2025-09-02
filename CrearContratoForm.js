import React, { useState } from 'react';
import { View, TextInput, Button, Text, Picker, Switch } from 'react-native';
import { crearContrato } from '../services/crearApi';
import { validarContrato } from '../validations/contratoValidation';

export default function CrearContratoForm({ onCreated }) {
  const [form, setForm] = useState({
    nombre: '',
    cliente: '',
    fechaInicio: '',
    fechaFin: '',
    monto: '',
    tipo: 'Servicio',
    responsable: '',
    notas: '',
    firmado: false,
  });
  const [errores, setErrores] = useState([]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const erroresVal = validarContrato(form);
    if (erroresVal.length) {
      setErrores(erroresVal);
      return;
    }
    await crearContrato(form);
    setForm({
      nombre: '', cliente: '', fechaInicio: '', fechaFin: '', monto: '',
      tipo: 'Servicio', responsable: '', notas: '', firmado: false,
    });
    setErrores([]);
    if (onCreated) onCreated();
    alert('Contrato creado');
  };

  return (
    <View>
      {errores.length > 0 && errores.map((e, i) => <Text key={i} style={{ color: 'red' }}>{e}</Text>)}
      <Text>Nombre</Text>
      <TextInput value={form.nombre} onChangeText={v => handleChange('nombre', v)} />
      <Text>Cliente</Text>
      <TextInput value={form.cliente} onChangeText={v => handleChange('cliente', v)} />
      <Text>Fecha Inicio (YYYY-MM-DD)</Text>
      <TextInput value={form.fechaInicio} onChangeText={v => handleChange('fechaInicio', v)} />
      <Text>Fecha Fin (YYYY-MM-DD)</Text>
      <TextInput value={form.fechaFin} onChangeText={v => handleChange('fechaFin', v)} />
      <Text>Monto</Text>
      <TextInput value={form.monto} onChangeText={v => handleChange('monto', v)} keyboardType="numeric" />
      <Text>Tipo</Text>
      <Picker selectedValue={form.tipo} onValueChange={v => handleChange('tipo', v)}>
        <Picker.Item label="Servicio" value="Servicio" />
        <Picker.Item label="Venta" value="Venta" />
        <Picker.Item label="Alquiler" value="Alquiler" />
      </Picker>
      <Text>Responsable</Text>
      <TextInput value={form.responsable} onChangeText={v => handleChange('responsable', v)} />
      <Text>Notas</Text>
      <TextInput value={form.notas} onChangeText={v => handleChange('notas', v)} />
      <Text>Firmado</Text>
      <Switch value={form.firmado} onValueChange={v => handleChange('firmado', v)} />
      <Button title="Crear Contrato" onPress={handleSubmit} />
    </View>
  );
}