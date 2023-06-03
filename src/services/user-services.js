import apiFetch from "./api-fetch.js";
import { tokenKey } from "../config.js";

export async function newUser(data) {
  const { token, ...user } = await apiFetch("signup", { body: data });
  sessionStorage.setItem(tokenKey, token);
  return user;
}
