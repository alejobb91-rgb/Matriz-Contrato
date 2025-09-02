export async function getSociales() {
  const res = await fetch('http://localhost:4000/api/sociales');
  return await res.json();
}