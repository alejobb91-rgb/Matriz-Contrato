const API_URL = "http://localhost:4000/api/contracts";

export async function getContracts() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createContract(contract) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contract),
  });
  return await res.json();
}

export function getContractPdfUrl(id) {
  return `${API_URL}/${id}/pdf`;
}