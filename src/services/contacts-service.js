import apiFetch from "./api-fetch.js";

export async function getContacts() {
  return await apiFetch("contacts");
}
