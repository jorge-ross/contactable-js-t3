import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { editContactAPI } from "../services/contacts-service.js";
import { input } from "../components/input.js";

function render() {
  const id = STORE.edit_id;
  const contact = STORE.contacts.find((contact) => contact.id == id);
  // console.log(id);
  // console.log(contact);
  const { name, number, email, relation, ...rest } = contact;
  const { editError } = editContact.state;

  return `
    <main class="section-xs">
      <section class="container">
        <form class="new-contact-form js-edit-contact-form">
          <div class="new-contact-form__div">
            ${input({
              id: "name",
              placeholder: "Name",
              required: true,
              value: name,
              name: "name",
            })}
            ${
              editError.name
                ? `<p class="error-300">${editError.name.join(", ")}</p>`
                : ""
            }
            ${input({
              id: "number",
              placeholder: "Number",
              value: number,
              name: "number",
            })}
            ${
              editError.number
                ? `<p class="error-300">${editError.number.join(", ")}</p>`
                : ""
            }
            ${input({
              id: "email",
              placeholder: "Email",
              type: "email",
              required: true,
              value: email,
              name: "email",
            })}
            ${
              editError.email
                ? `<p class="error-300">${editError.email.join(", ")}</p>`
                : ""
            }
            <select class="select" name="relation" id="relation">
              <option value="${relation}" selected disabled hidden>${relation}</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Work">Work</option>
              <option value="Acquaintance">Acquaintance</option>
            </select>
            ${
              editError
                ? `<p class="text-center error-300">${editError}</p>`
                : ""
            }
          </div>
          <div class="new-contact-buttons">
            <a href="#" class="new-contact-sign-up-button js-back">Cancel</a>
            <button class="new-contact-save-button">Save</button>
          </div>
        </form>
      </section>
    </main>
  `;
}

function listenSubmitForm() {
  const id = STORE.edit_id;
  const form = document.querySelector(".js-edit-contact-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      const { name, number, email, relation } = event.target.elements;

      const data = {
        name: name.value,
        number: number.value,
        email: email.value,
        relation: relation.value,
      };
      await editContactAPI(id, data);
      STORE.updateContactLocal(id, data);
      STORE.currentTab = "Contactable";
      DOMHandler.reload();
    } catch (error) {
      // console.log(error);
      this.state.editError = error.message;
      DOMHandler.reload();
    }
  });
}

function listenCancel() {
  const cancel = document.querySelector(".js-back");

  cancel.addEventListener("click", (event) => {
    STORE.currentTab = "Contactable";
    DOMHandler.reload();
  });
}

const editContact = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this);
    listenCancel();
  },
  state: {
    editError: false,
  },
};

export default editContact;
