import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { editContactAPI } from "../services/contacts-service.js";
import { input } from "../components/input.js";

function render() {
  const id = STORE.edit_id;
  const contact = STORE.contacts.find((contact) => contact.id == id);
  const { name, number, email, relation, ...rest } = contact;
  const { editError } = editContact.state;
  const errors = STORE.errors;

  return `
    <main class="section-xs">
      <section class="container">
        <form class="new-contact-form js-edit-contact-form">
          <div>
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
              errors.relation ? " select--red" : " select--gray"
            }" 
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
      console.log(STORE.errors);
      this.state.editError = error.messages;
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
