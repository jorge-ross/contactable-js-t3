import apiFetch from "./api-fetch.js";

export async function getContacts() {
  return await apiFetch("contacts");
}

export async function editContactAPI(id, data) {
  const body = {
    favorite: data.favorite,
    name: data.name,
    number: data.number,
    email: data.email,
    relation: data.relation,
  };
  return await apiFetch(`contacts/${id}`, { method: "PATCH", body: body });
}
