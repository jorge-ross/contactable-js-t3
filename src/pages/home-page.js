import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import contactDetail from "./contact-detail-page.js";
import newContact from "./new-contact-page.js";
import editContact from "./edit-contact-page.js";
import Contactable from "../components/contactable.js";
// import Profile from "../components/profile.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";

function render() {
  const currentTab = STORE.currentTab;
  const styles = currentTab === "Contactable" ? "heading--sm" : "heading--xs";
  return `
    <main class="section-xs">
      <section class="container">
        <div class="home-header
        ${currentTab === "Contactable" ? "border-bottom-gray" : ""}">
          <h1 class="home-header__title ${styles}">
            ${STORE.currentTab}
          </h1>
          <button class="home-logout-button js-logout">Logout</button>
        </div>
        ${currentTab === "Contactable" ? Contactable : ""}
        ${currentTab === "Create new contact" ? newContact : ""}
        ${currentTab === "Contact Detail" ? contactDetail : ""}
        ${currentTab === "Edit Contact" ? editContact : ""}
      </section>
    </main>
  `;
}

function listenLogout() {
  const a = document.querySelector(".js-logout");

  a.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      await logout();
      STORE.currentTab = "Contactable";
      STORE.errors = {};
      STORE.new = {};
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout();
    if (STORE.currentTab === "Contactable") Contactable.addListeners();
    if (STORE.currentTab === "Create new contact") newContact.addListeners();
    if (STORE.currentTab === "Edit Contact") editContact.addListeners();
    if (STORE.currentTab === "Contact Detail") contactDetail.addListeners();
  },
};

export default HomePage;
