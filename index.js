import DOMHandler from "./src/dom-handler.js";
import LoginPage from "./src/pages/login-page.js";
import HomePage from "./src/pages/home-page.js";
import { tokenKey } from "./src/config.js";
import STORE from "./src/store.js";
import contactDetail from "./src/pages/contact-detail-page.js";
// import createUser from "./src/pages/sign-up.js";
// import newContact from "./src/pages/new-contact-page.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);
    if (!token) throw new Error();

    // const user = await getUser();
    // STORE.user = user;
    await STORE.fetchContacts();
    DOMHandler.load(HomePage);
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

init();

// DOMHandler.load(createUser);
