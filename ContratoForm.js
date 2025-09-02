import React, { useState, useEffect } from "react";

const initialState = {
  numero: "",
  objeto: "",
  contratista: "",
  fechaInicio: "",
  fechaFin: "",
  valor: ""
};

export default function ContratoForm({ onSave, contrato, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setForm(contrato || initialState);
  }, [contrato]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.numero || !form.objeto || !form.contratista) return;
    onSave({ ...form, valor: Number(form.valor) });
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: "#f2f2f2", padding: 16, borderRadius: 8 }}>
      <h3>{contrato ? "Editar Contrato" : "Nuevo Contrato"}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <input name="numero" placeholder="No. Contrato" value={form.numero} onChange={handleChange} required />
        <input name="objeto" placeholder="Objeto del contrato" value={form.objeto} onChange={handleChange} required style={{ flex: 1 }} />
        <input name="contratista" placeholder="Contratista" value={form.contratista} onChange={handleChange} required />
        <input name="fechaInicio" type="date" placeholder="Fecha Inicio" value={form.fechaInicio} onChange={handleChange} required />
        <input name="fechaFin" type="date" placeholder="Fecha Fin" value={form.fechaFin} onChange={handleChange} required />
        <input name="valor" type="number" placeholder="Valor" value={form.valor} onChange={handleChange} required min={0} />
      </div>
      <div style={{ marginTop: 12 }}>
        <button type="submit">{contrato ? "Actualizar" : "Crear"}</button>
        {contrato && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancelar</button>}
      </div>
    </form>
  );
}