import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import newContact from "../pages/new-contact-page.js";
import { editContactAPI } from "../services/contacts-service.js";

function renderContact(contact) {
  return `
    <li>
      <div class="contactable-card" data-id="${contact.id}" data-link="show">
        <div class="contactable-card__contact">
        <img
          class="contactable-card__image"
          src="assets/images/contact.png"
          alt="contact-img"
        />
          <p>${contact.name}</p>
        </div>
        <svg data-id="${contact.id}" 
        data-link="update" class="contactable-icon 
        ${contact.favorite ? "contactable-icon--active" : ""}">
          <use xlink:href="#star"/>
        </svg>
      </div>
    </li>
  `;
}

function render() {
  const contacts = STORE.contacts;
  const favorites = STORE.favorites;
  return `
    <div class="js-contacts">
      ${
        favorites.length == 0
          ? ""
          : `<div>
              <p class="contactable-title">Favorites (${
                STORE.favorites.length
              })</p>
              <ul class="contactable-favorites js-favorite-list">
                ${favorites.map(renderContact).join("")}
              </ul>
            </div>`
      }
      <div>
        <p class="contactable-title">Contacts (${STORE.contacts.length})</p>
        <ul class="contactable-contacts js-contact-list">
          ${contacts.map(renderContact).join("")}
        </ul>
      </div>
      <div class="contactable-add-button">
        <img
          class="contactable-add-button__img js-add-button"
          src="assets/images/add.png"
          alt="contact-img"
        />
      </div>
    </div>
  `;
}

function listenContacts() {
  const divContacts = document.querySelector(".js-contacts");
  divContacts.addEventListener("click", async (event) => {
    event.preventDefault();
    const link = event.target.closest("[data-link]");
    if (link.dataset.link == "show") {
      const id = link.dataset.id;
      const contact = STORE.contacts.find((contact) => contact.id == id);
      STORE.details = contact;
      STORE.currentTab = "Contact Detail";
      DOMHandler.reload();
      // console.log(STORE.currentTab);
    } else if (link.dataset.link == "update") {
      const id = link.dataset.id;
      const contact = STORE.contacts.find((contact) => contact.id == id);
      await editContactAPI(id, { favorite: !contact.favorite });
      STORE.updateContactLocal(id, { favorite: !contact.favorite });
      DOMHandler.reload();
    }
  });
}

function listenCreate() {
  const createButton = document.querySelector(".js-add-button");

  createButton.addEventListener("click", (event) => {
    DOMHandler.load(newContact);
  });
}

const Contactable = {
  toString() {
    return render();
  },
  addListeners() {
    listenContacts();
    listenCreate();
  },
};

export default Contactable;
