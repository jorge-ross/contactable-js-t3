import apiFetch from "./api-fetch.js";

export async function getContacts() {
  return await apiFetch("contacts");
}

export async function newContactAPI(data) {
  const body = {
    name: data.name,
    number: data.number,
    email: data.email,
    relation: data.relation,
  };
  return await apiFetch(`contacts`, { method: "POST", body: body });
}

export async function editContactAPI(id, data) {
  let body = {};
  if (data.favorite === true || data.favorite === false)
    body.favorite = data.favorite;
  if (data.name) body.name = data.name;
  if (data.number) body.number = data.number;
  if (data.email) body.email = data.email;
  if (data.relation) body.relation = data.relation;
  return await apiFetch(`contacts/${id}`, { method: "PATCH", body: body });
}

export async function deleteContact(id) {
  await apiFetch(`contacts/${id}`, { method: "DELETE" });
}
