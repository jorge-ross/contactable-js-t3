import DOMHandler from "./src/dom-handler.js";
import LoginPage from "./src/pages/login-page.js";
import { tokenKey } from "./src/config.js";
import STORE from "./src/store.js";

// async function init() {
//   try {
//     const token = sessionStorage.getItem(tokenKey);
//     if (!token) throw new Error();

//     const user = await getUser();
//     STORE.user = user;
//     await STORE.fetchCategories();
//     DOMHandler.load(HomePage);
//   } catch (error) {
//     sessionStorage.removeItem(tokenKey);
//     DOMHandler.load(LoginPage);
//   }
// }

DOMHandler.load(LoginPage);
