import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";

function renderContact(contact) {
  return `
    <li>
      <div class="contactable-card">
        <div class="contactable-card__contact">
        <img
          class="contactable-card__image"
          src="assets/images/contact.png"
          alt="contact-img"
        />
          <p>${contact.name}</p>
        </div>
        <svg class="contactable-card__favorite"><use xlink:href="#star"/></svg>
      </div>
    </li>
  `;
}

function render() {
  const contacts = STORE.contacts;
  return `
    <div class="contactable-title">
      <p>Contacts (${STORE.contacts.length})</p>
    </div>
    <ul class="contactable-contacts js-contact-list">
      ${contacts.map(renderContact).join("")}
    </ul>
  `;
}

function listenSelect() {}

function listenFavorite() {}

const Contactable = {
  toString() {
    return render();
  },
  addListener() {
    listenSelect();
    listenFavorite();
  },
};

export default Contactable;
