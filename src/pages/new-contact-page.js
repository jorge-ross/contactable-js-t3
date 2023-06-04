import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { newContactAPI } from "../services/contacts-service.js";
import { input } from "../components/input.js";

function render() {
  const contact = STORE.new;
  const { name, number, email, relation, ...rest } = contact;
  const { createError } = newContact.state;
  const errors = STORE.errors;

  return `
    <main class="section-xs">
      <section class="container">
        <form class="new-contact-form js-new-contact-form">
          <div">
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
              ${
                relation
                  ? "<option value=" +
                    relation +
                    " selected disabled hidden>" +
                    relation +
                    "</option>"
                  : "<option value='' selected disabled hidden>Relation</option>"
              }
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
              createError
                ? `<p class="text-center error-300">${createError}</p>`
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
    console.dir(event.target.classList);
    cancel.classList.replace(event.target.classList[2], "select--color-black");
  });
}

function listenSubmitForm() {
  const form = document.querySelector(".js-new-contact-form");

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
      await newContactAPI(data);
      await STORE.fetchContacts();
      STORE.currentTab = "Contactable";
      STORE.errors = {};
      STORE.new = {};
      DOMHandler.reload();
    } catch (error) {
      this.state.createError = error.message;
      STORE.new = data;
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

const newContact = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenCancel();
    listenSelect();
    listenSubmitForm.call(this);
  },
  state: {
    createError: false,
  },
};

export default newContact;
