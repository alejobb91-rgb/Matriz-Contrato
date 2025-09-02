export async function getContratos() {
  const res = await fetch('http://localhost:4000/api/contratos');
  return await res.json();
}