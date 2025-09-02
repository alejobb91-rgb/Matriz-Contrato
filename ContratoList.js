import React from "react";

export default function ContratoList({ contratos, onEdit, onDelete }) {
  if (!contratos.length) return <p>No hay contratos registrados.</p>;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#eaeaea" }}>
          <th>No.</th>
          <th>Objeto</th>
          <th>Contratista</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Valor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {contratos.map(c => (
          <tr key={c._id}>
            <td>{c.numero}</td>
            <td>{c.objeto}</td>
            <td>{c.contratista}</td>
            <td>{c.fechaInicio}</td>
            <td>{c.fechaFin}</td>
            <td>${Number(c.valor).toLocaleString()}</td>
            <td>
              <button onClick={() => onEdit(c)}>Editar</button>
              <button onClick={() => onDelete(c._id)} style={{ marginLeft: 6, color: "#c00" }}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}