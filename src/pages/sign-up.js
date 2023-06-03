import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";
import { input } from "../components/input.js";
import { newUser } from "../services/user-services.js";

function render() {
  const { CreateUserError } = this.state;
  return `
    <main class="section-xs">
      <section class="container">
        <div class="sign-up-header">
          <h1 class="sign-up-header__title">Signup</h1>
        </div>
        <form class="sign-up-form js-sign-up-form">
          ${input({
            id: "email",
            name: "email",
            placeholder: "email",
            type: "email",
            required: true,
          })}

          ${input({
            id: "password",
            name: "password",
            placeholder: "password",
            type: "password",
            required: true,
          })}

          ${
            CreateUserError
              ? `<p class="text-center error-300">${CreateUserError}</p>`
              : ""
          }
          <div class="sign-up-buttons">
            <a href="#" class="login-sign-up-button js-login">Login</a>
            <button class="login-login-button">Create Account</button>
          </div>
        </form>
      </section>
    </main>
  `;
}

function listenLogin() {
  const login = document.querySelector(".js-login");

  login.addEventListener("click", (event) => {
    DOMHandler.load(LoginPage);
  });
}

function listenerSignUp() {
  const form = document.querySelector(".js-sign-up-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target.elements;
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
    listenLogin();
    listenerSignUp();
  },
  state: {
    CreateUserError: null,
  },
};

export default createUser;
