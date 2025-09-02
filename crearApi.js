export async function crearContrato(data) {
  const res = await fetch('http://localhost:4000/api/crear/contrato', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}