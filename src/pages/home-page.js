import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import Contactable from "../components/contactable.js";
// import Profile from "../components/profile.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";

function render() {
  const currentTab = STORE.currentTab;
  return `
    <main class="section-xs">
      <section class="container">
        <div class="home-header">
          <h1 class="home-header__title">${STORE.currentTab}</h1>
          <button class="home-logout-button">Logout</button>
        </div>
        ${currentTab === "Contactable" ? Contactable : ""}
        ${currentTab === "Create new contact" ? newContact : ""}
        ${currentTab === "Contact Detail" ? contactDetail : ""}
        ${currentTab === "Edit Contact" ? editContact : ""}
      </section>
    </main>
  `;
}

function selectContact() {}

function listenLogout() {}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout();
    // if (STORE.currentTab === "expense") ExpensesIncome.addListener();
    // if (STORE.currentTab === "income") ExpensesIncome.addListener();
    // if (["expense", "income"].includes(STORE.currentTab))
    //   ExpensesIncome.addListener();
    // if (STORE.currentTab === "profile") Profile.addListeners();
    Contactable.addListeners();
  },
};

export default HomePage;
