import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function CrearSocialForm({ onCreated }) {
  const [form, setForm] = useState({
    cedula: '',
    nombre: '',
    celular: '',
    correo: ''
  });
  const [errores, setErrores] = useState([]);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const validar = () => {
    const errores = [];
    if (!form.cedula) errores.push('La cédula es obligatoria');
    if (!form.nombre) errores.push('El nombre es obligatorio');
    if (!form.celular) errores.push('El celular es obligatorio');
    if (!form.correo) {
      errores.push('El correo es obligatorio');
    } else if (!/^[a-zA-Z0-9._%+-]+@idu\.gov\.co$/.test(form.correo)) {
      errores.push('El correo debe ser tipo xxxx@idu.gov.co');
    }
    return errores;
  };

  const handleSubmit = async () => {
    const erroresVal = validar();
    if (erroresVal.length) {
      setErrores(erroresVal);
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/crear/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert('Éxito', 'Registro social creado');
        setForm({ cedula: '', nombre: '', celular: '', correo: '' });
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
    <View style={{ padding: 16 }}>
      {errores.length > 0 && errores.map((e, i) => <Text key={i} style={{ color: 'red' }}>{e}</Text>)}
      <Text>No. Cédula</Text>
      <TextInput value={form.cedula} onChangeText={v => handleChange('cedula', v)} keyboardType="numeric" />
      <Text>Nombre</Text>
      <TextInput value={form.nombre} onChangeText={v => handleChange('nombre', v)} />
      <Text>Celular</Text>
      <TextInput value={form.celular} onChangeText={v => handleChange('celular', v)} keyboardType="phone-pad" />
      <Text>Correo Electrónico (xxxx@idu.gov.co)</Text>
      <TextInput value={form.correo} onChangeText={v => handleChange('correo', v)} keyboardType="email-address" />
      <Button title="Crear Social" onPress={handleSubmit} />
    </View>
  );
}