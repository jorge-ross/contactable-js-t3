import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";
import { input } from "../components/input.js";
import { newUser } from "../services/user-services.js";

function render() {
  const { CreateUserError } = this.state;
  return `
  <form class="js-signup-form">
    ${input({
      label: "email",
      id: "email",
      name: "email",
      placeholder: "newuser@mail.com",
      type: "email",
      required: true,
    })}
    ${input({
      label: "password",
      id: "password",
      name: "password",
      placeholder: "******",
      type: "password",
      required: true,
    })}
    ${CreateUserError ? `<p>${CreateUserError}</p>` : ""}
      <button>Create Account</button>
  </form>`;
}

function listenerSignUp() {
  const form = document.querySelector(".js-signup-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };
      const user = await newUser(credentials);
      STORE.user = user;
      await STORE.fetchContacts();
      DOMHandler.load(HomePage);
    } catch (error) {
      this.state.CreateUserError = error.message;
      DOMHandler.reload();
    }
  });
}

const createUser = {
  toString() {
    return render.call(this, this.addListeners);
  },
  addListeners() {
    listenerSignUp();
  },
  state: {
    CreateUserError: null,
  },
};

export default createUser;
