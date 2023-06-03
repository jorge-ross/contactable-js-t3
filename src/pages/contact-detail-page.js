import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import HomePage from "./home-page.js";
import { logout } from "../services/sessions-service.js";

function render() {
  const { id, name, number, email, favorite, relation } = STORE.details;
  const { formError } = contactDetail.state;

  return `
<div class="contact__detail">
<img src="./assets/images/contact.png" alt="" class="contact__detail.img" />
  <div>${name}</div>
  <div>${relation}</div>
  <br />
  <div>Number: ${number}</div>
  <div>Email: ${email}</div>
</div>

<div class="__actions">
  <a class="__back">Back</a>
  <a class="__delete data-id=${id}>Delete</a>
  <a class="__edit" data-id=${id}>Edit</a>.
</div>
`;
}

function listenBack() {
  const back = document.querySelector(".__back");
  back.addEventListener("click", async () => {
    DOMHandler.load(HomePage);
  });
}

function listenDelete() {
  const contact = document.querySelector(".__delete");
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
    listenDelete();
  },
  state: {
    formError: false,
  },
};

export default contactDetail;
