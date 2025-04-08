const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function fetchDepartments() {
  const res = await fetch(`${BASE_URL}/departments`);
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
}

export async function searchObjects(query: string, departmentId?: number) {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set("q", query);
  if (departmentId) {
    url.searchParams.set("departmentId", departmentId.toString());
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to search objects");
  return res.json();
}

export async function fetchObjectById(id: number) {
  const res = await fetch(`${BASE_URL}/objects/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch object ID ${id}`);
  return res.json();
}

export async function fetchObjectsByDepartment(departmentId: number) {
  const res = await fetch(`${BASE_URL}/objects?departmentIds=${departmentId}`);
  if (!res.ok) throw new Error(`Failed to fetch department ID ${departmentId}`);
  return res.json();
}
