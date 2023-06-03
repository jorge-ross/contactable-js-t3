import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { newContactAPI } from "../services/contacts-service.js";
import HomePage from "./home-page.js";
import { editContactAPI } from "../services/contacts-service.js";
import { input } from "../components/input.js";

function render() {
  const { createError } = newContact.state;

  return `
    <main class="section-xs">
      <section class="container">
        <form class="new-contact-form js-new-contact-form">
          <div class="new-contact-form__div">
            ${input({
              id: "name",
              placeholder: "Name",
              required: true,
              name: "name",
            })}
            ${
              createError.name
                ? `<p class="error-300">${createError.name.join(", ")}</p>`
                : ""
            }
            ${input({
              id: "number",
              placeholder: "Number",
              name: "number",
            })}
            ${
              createError.number
                ? `<p class="error-300">${createError.number.join(", ")}</p>`
                : ""
            }
            ${input({
              id: "email",
              placeholder: "Email",
              type: "email",
              required: true,
              name: "email",
            })}
            ${
              createError.email
                ? `<p class="error-300">${createError.email.join(", ")}</p>`
                : ""
            }
            <select class="select" name="relation" id="relation">
              <option value="" selected disabled hidden>Relation</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Work">Work</option>
              <option value="Acquaintance">Acquaintance</option>
            </select>
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

function listenSubmitForm() {
  const form = document.querySelector(".js-new-contact-form");

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
      await newContactAPI(data);
      await STORE.fetchContacts();
      STORE.currentTab = "Contactable";
      DOMHandler.reload();
    } catch (error) {
      // console.log(error.message);
      this.state.createError = error.message;
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
    return render();
  },
  addListeners() {
    listenCancel();
    listenSubmitForm();
  },
  state: {
    createError: false,
  },
};

export default newContact;
