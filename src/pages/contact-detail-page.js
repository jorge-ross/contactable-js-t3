import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import HomePage from "./home-page.js";
import { logout } from "../services/sessions-service.js";

function render() {
  const { id, name, number, email, favorite, relation, ...rest } =
    STORE.details;
  const { formError } = contactDetail.state;

  return `
    <div class="contact-detail-card">
      <div class="contact-detail-card__header">
        <img src="./assets/images/contact.png" alt="" class="contact-detail-card__image" />
        <p>${name}</p>
        <p class="content-xs text-light">${relation}</p>
      </div>
      <div class="contact-detail-card__body">
        <p class="content-xs">Number: ${number}</P>
        <p class="content-xs">Email: ${email}</P>
      </div>
    </div>

    <div class="contact-detail-actions">
      <a class="contact-detail-buttons js-back">Back</a>
      <a class="contact-detail-buttons js-delete" data-id="${id}">Delete</a>
      <a class="contact-detail-buttons js-edit" data-id="${id}">Edit</a>
    </div>
  `;
}

function listenBack() {
  const back = document.querySelector(".js-back");
  back.addEventListener("click", async () => {
    STORE.currentTab = "Contactable";
    DOMHandler.load(HomePage);
  });
}

function listenEdit() {
  const edit = document.querySelector(".js-edit");
  edit.addEventListener("click", async () => {
    // console.log("clicked");
    STORE.edit_id = edit.dataset.id;
    STORE.currentTab = "Edit Contact";
    DOMHandler.reload();
  });
}

function listenDelete() {
  const contact = document.querySelector(".js-delete");
  contact.addEventListener("click", async (event) => {
    event.preventDefault();
    const eraseContact = event.target.closest("[data-id]");
    if (!eraseContact) return;

    const id = eraseContact.dataset.id;

    const contacts = STORE.contacts.filter((item) => item.id != id);
    STORE.contacts = contacts;

    await deleteContact(id);

    DOMHandler.load(HomePage);
  });
}

const contactDetail = {
  toString() {
    return render();
  },
  addListeners() {
    listenBack();
    listenEdit();
    listenDelete();
  },
  state: {
    formError: false,
  },
};

export default contactDetail;
