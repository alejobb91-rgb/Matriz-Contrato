import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Suplanta estos arrays con fetch si tienes endpoint
const localidades = ["Usaquén", "Chapinero", "Santa Fe"];
const upz = ["Andes", "Chicó Lago", "El Refugio"];
const barrios = ["Cedritos", "Chicó Norte", "Las Cruces"];

export default function DatosContratoForm({ onCreated }) {
  const [form, setForm] = useState({
    numeroContrato: '',
    localidad: localidades[0],
    upz: upz[0],
    barrio: barrios[0],
    poblacionBeneficiada: '',
    fechaInicioContrato: '',
    fechaFinalizacionContrato: '',
    direccionPuntoIDU: '',
    correoPuntoIDU: '',
    telefonoPuntoIDU: ''
  });
  const [errores, setErrores] = useState([]);

  const validar = () => {
    const errores = [];
    if (!form.numeroContrato) errores.push('No. Contrato es obligatorio');
    if (!form.localidad) errores.push('Localidad es obligatoria');
    if (!form.upz) errores.push('UPZ es obligatoria');
    if (!form.barrio) errores.push('Barrio es obligatorio');
    if (!form.poblacionBeneficiada || isNaN(Number(form.poblacionBeneficiada))) errores.push('Población Beneficiada debe ser numérica');
    if (!form.fechaInicioContrato) errores.push('Fecha Inicio Contrato es obligatoria');
    if (!form.fechaFinalizacionContrato) errores.push('Fecha Finalización Contrato es obligatoria');
    if (!form.direccionPuntoIDU) errores.push('Dirección Punto IDU es obligatoria');
    if (!form.correoPuntoIDU || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.correoPuntoIDU)) errores.push('Correo Punto IDU inválido');
    if (!form.telefonoPuntoIDU) errores.push('No. Telefónico Punto IDU es obligatorio');
    return errores;
  };

  const handleSubmit = async () => {
    const errs = validar();
    if (errs.length) {
      setErrores(errs);
      return;
    }
    const res = await fetch('http://localhost:4000/api/gestion-contrato/datos-contrato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      onCreated && onCreated();
      Alert.alert('¡Éxito!', 'Datos de contrato guardados');
      setForm({
        numeroContrato: '', localidad: localidades[0], upz: upz[0], barrio: barrios[0],
        poblacionBeneficiada: '', fechaInicioContrato: '', fechaFinalizacionContrato: '',
        direccionPuntoIDU: '', correoPuntoIDU: '', telefonoPuntoIDU: ''
      });
      setErrores([]);
    } else {
      const data = await res.json();
      setErrores(data.errores || ['Error al guardar']);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {errores.map((e, i) => <Text key={i} style={{ color: 'red' }}>{e}</Text>)}
      <Text>No. Contrato</Text>
      <TextInput value={form.numeroContrato} onChangeText={v => setForm({ ...form, numeroContrato: v })} />
      <Text>Localidad</Text>
      <Picker selectedValue={form.localidad} onValueChange={v => setForm({ ...form, localidad: v })}>
        {localidades.map(l => <Picker.Item key={l} label={l} value={l} />)}
      </Picker>
      <Text>UPZ</Text>
      <Picker selectedValue={form.upz} onValueChange={v => setForm({ ...form, upz: v })}>
        {upz.map(u => <Picker.Item key={u} label={u} value={u} />)}
      </Picker>
      <Text>Barrio</Text>
      <Picker selectedValue={form.barrio} onValueChange={v => setForm({ ...form, barrio: v })}>
        {barrios.map(b => <Picker.Item key={b} label={b} value={b} />)}
      </Picker>
      <Text>Población Beneficiada</Text>
      <TextInput value={form.poblacionBeneficiada} onChangeText={v => setForm({ ...form, poblacionBeneficiada: v })} keyboardType="numeric" />
      <Text>Fecha Inicio Contrato</Text>
      <TextInput value={form.fechaInicioContrato} onChangeText={v => setForm({ ...form, fechaInicioContrato: v })} placeholder="YYYY-MM-DD" />
      <Text>Fecha Finalización Contrato</Text>
      <TextInput value={form.fechaFinalizacionContrato} onChangeText={v => setForm({ ...form, fechaFinalizacionContrato: v })} placeholder="YYYY-MM-DD" />
      <Text>Dirección Punto IDU</Text>
      <TextInput value={form.direccionPuntoIDU} onChangeText={v => setForm({ ...form, direccionPuntoIDU: v })} />
      <Text>Correo Punto IDU</Text>
      <TextInput value={form.correoPuntoIDU} onChangeText={v => setForm({ ...form, correoPuntoIDU: v })} keyboardType="email-address" />
      <Text>No. Telefónico Punto IDU</Text>
      <TextInput value={form.telefonoPuntoIDU} onChangeText={v => setForm({ ...form, telefonoPuntoIDU: v })} keyboardType="phone-pad" />
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
}