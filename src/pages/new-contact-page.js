import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import LoginPage from "./login-page.js";
import { input } from "../components/input.js";

function render() {
  const { name, number, email, favorite, relation } = STORE.edit;
  const { formError } = newContact.state;

  const title = `${STORE.edit.id ? "Edit" : "Create new"} contact`;
  STORE.header = { title };

  return `
  <form class="flex flex-column gap-4 mb-4 js-profile-form">
    ${input({
      label: "Name",
      id: "name",
      placeholder: "Name",
      required: true,
      value: name,
      name: "name",
    })}
    ${
      formError.name
        ? `<p class="error-300">${formError.name.join(", ")}</p>`
        : ""
    }
    ${input({
      label: "Number",
      id: "number",
      placeholder: "Number",
      value: number,
      name: "number",
    })}
    ${
      formError.number
        ? `<p class="error-300">${formError.number.join(", ")}</p>`
        : ""
    }
    ${input({
      label: "email",
      id: "email",
      placeholder: "Email",
      type: "email",
      required: true,
      value: email,
      name: "email",
    })}
    ${input({
      label: "favorite",
      id: "favorite",
      value: favorite ? favorite : "false",
      name: "favorite",
    })}
    ${input({
      label: "relation",
      id: "relation",
      value: relation,
      name: "relation",
    })}
    ${
      formError.email
        ? `<p class="error-300">${formError.email.join(", ")}</p>`
        : ""
    }

    ${formError ? `<p class="text-center error-300">${formError}</p>` : ""}
      <button class="button button--primary">Update</button>
    </form>
    `;
}

const newContact = {
  toString() {
    return render();
  },
  addListeners() {},
  state: {
    formError: false,
  },
};

export default newContact;
