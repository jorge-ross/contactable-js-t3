import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { editContactAPI } from "../services/contacts-service.js";
import { input } from "../components/input.js";

function render() {
  const contact = STORE.edit;
  const { name, number, email, relation, ...rest } = contact;
  const { editError } = editContact.state;
  const errors = STORE.errors;

  return `
    <main class="section-xs">
      <section class="container">
        <form class="new-contact-form js-edit-contact-form">
          <div class="full-contact-form">
            ${input({
              id: "name",
              placeholder: "Name",
              value: name,
              name: "name",
              error: errors.name,
            })}
            ${
              errors.name
                ? `<p class="input__error-message">Name: ${errors.name.join(
                    ", "
                  )}</p>`
                : ""
            }
            </br>
            ${input({
              id: "number",
              placeholder: "Number",
              value: number,
              name: "number",
              error: errors.number,
            })}
            ${
              errors.number
                ? `<p class="input__error-message">Number: ${errors.number.join(
                    ", "
                  )}</p>`
                : ""
            }
            </br>
            ${input({
              id: "email",
              placeholder: "Email",
              type: "text",
              value: email,
              name: "email",
              error: errors.email,
            })}
            ${
              errors.email
                ? `<p class="input__error-message">Email: ${errors.email.join(
                    ", "
                  )}</p>`
                : ""
            }
            </br>
            <select class="select${
              errors.relation
                ? " select--border-bottom-red"
                : " select--border-bottom-gray"
            } select--color-gray js-new-contact-select" 
            name="relation" id="relation">
              <option value="${relation}" selected disabled hidden>${relation}</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Work">Work</option>
              <option value="Acquaintance">Acquaintance</option>
            </select>
            ${
              errors.relation
                ? `<p class="select__error-message">Relation: ${errors.relation.join(
                    ", "
                  )}</p>`
                : ""
            }
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

function listenSelect() {
  const cancel = document.querySelector(".js-new-contact-select");

  cancel.addEventListener("change", (event) => {
    cancel.classList.replace(event.target.classList[2], "select--color-black");
  });
}

function listenSubmitForm() {
  const id = STORE.edit.id;
  const form = document.querySelector(".js-edit-contact-form");

  form.addEventListener("submit", async (event) => {
    const { name, number, email, relation } = event.target.elements;
    const data = {
      name: name.value,
      number: number.value,
      email: email.value,
      relation: relation.value,
    };
    try {
      event.preventDefault();
      await editContactAPI(id, data);
      STORE.updateContactLocal(id, data);
      STORE.currentTab = "Contactable";
      STORE.errors = {};
      DOMHandler.reload();
    } catch (error) {
      this.state.editError = error.messages;
      STORE.edit = data;
      STORE.edit.id = id;
      DOMHandler.reload();
    }
  });
}

function listenCancel() {
  const cancel = document.querySelector(".js-back");

  cancel.addEventListener("click", (event) => {
    STORE.currentTab = "Contactable";
    STORE.errors = {};
    DOMHandler.reload();
  });
}

const editContact = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this);
    listenSelect();
    listenCancel();
  },
  state: {
    editError: false,
  },
};

export default editContact;
