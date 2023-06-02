import apiFetch from "./api-fetch.js";
import { tokenKey } from "../config.js";

export async function newUser(NewUser = { email, password }) {
  const { token, ...user } = await apiFetch("signup", { body: NewUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}
