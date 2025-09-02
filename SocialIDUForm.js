import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, FlatList, TouchableOpacity } from 'react-native';

export default function SocialIDUForm({ onCreated }) {
  const [form, setForm] = useState({
    numeroContrato: '',
    cedulaCoordinador: '',
    radicadoAsignacion: '',
    fechaDesignacion: '',
    activo: true,
  });
  const [errores, setErrores] = useState([]);
  const [search, setSearch] = useState('');
  const [coordinadores, setCoordinadores] = useState([]);

  useEffect(() => {
    if (search.length >= 3) {
      fetch(`http://localhost:4000/api/crear/social?search=${search}`)
        .then(res => res.json())
        .then(setCoordinadores);
    } else {
      setCoordinadores([]);
    }
  }, [search]);

  const handleSelectCoordinador = (cedula) => {
    setForm({ ...form, cedulaCoordinador: cedula });
    setSearch('');
    setCoordinadores([]);
  };

  const validar = () => {
    const errores = [];
    if (!form.numeroContrato) errores.push('El No. Contrato es obligatorio');
    if (!form.cedulaCoordinador) errores.push('Debe elegir un coordinador social');
    if (!/^[0-9]+$/.test(form.radicadoAsignacion)) errores.push('Radicado debe ser solo números');
    if (!form.fechaDesignacion) errores.push('La fecha es obligatoria');
    return errores;
  };

  const handleSubmit = async () => {
    const errs = validar();
    if (errs.length) {
      setErrores(errs);
      return;
    }
    const res = await fetch('http://localhost:4000/api/asociar/social-idu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ numeroContrato: '', cedulaCoordinador: '', radicadoAsignacion: '', fechaDesignacion: '', activo: true });
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
      <Text>Buscar Coordinador Social</Text>
      <TextInput value={search || form.cedulaCoordinador} onChangeText={setSearch} placeholder="Buscar por nombre o cédula..." />
      {coordinadores.length > 0 && (
        <FlatList
          data={coordinadores}
          keyExtractor={item => item.cedula}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectCoordinador(item.cedula)}>
              <Text>{item.nombre} ({item.cedula})</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Text>Radicado Asignación</Text>
      <TextInput value={form.radicadoAsignacion} onChangeText={v => setForm({ ...form, radicadoAsignacion: v })} keyboardType="numeric" />
      <Text>Fecha Designación</Text>
      <TextInput value={form.fechaDesignacion} onChangeText={v => setForm({ ...form, fechaDesignacion: v })} placeholder="YYYY-MM-DD" />
      <Text>Activo</Text>
      <Switch value={form.activo} onValueChange={v => setForm({ ...form, activo: v })} />
      <Button title="Asociar" onPress={handleSubmit} />
    </View>
  );
}