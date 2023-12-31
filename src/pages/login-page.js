import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import HomePage from "./home-page.js";
import createUser from "./sign-up.js";
import { login } from "../services/sessions-service.js";
import { input } from "../components/input.js";

function render() {
  const { loginError } = this.state;
  return `
    <main class="section-xs">
      <section class="container">
        <div class="login-header">
          <h1 class="login-header__title">Login</h1>
        </div>
        <form class="login-form js-login-form">
        <div class="login-full-form">
          ${input({
            id: "email",
            name: "email",
            placeholder: "email",
            type: "email",
            required: true,
            value: "team3-kevin@mail.com",
          })}

          ${input({
            id: "password",
            name: "password",
            placeholder: "password",
            type: "password",
            required: true,
            value: "qwerty",
          })}

          ${
            loginError
              ? `<p class="text-center error-300">${loginError}</p>`
              : ""
          }
          </div>
          <div class="login-buttons">
            <a href="#" class="login-sign-up-button js-sign-up">Signup</a>
            <button class="login-login-button">Login</button>
          </div>
        </form>
      </section>
    </main>
  `;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      const { email, password } = event.target.elements;

      const credentials = {
        email: email.value,
        password: password.value,
      };

      const user = await login(credentials);
      STORE.user = user;
      await STORE.fetchContacts();
      DOMHandler.load(HomePage);
    } catch (error) {
      this.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}

function listenSignUp() {
  const signUp = document.querySelector(".js-sign-up");

  signUp.addEventListener("click", (event) => {
    DOMHandler.load(createUser);
  });
}

const LoginPage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this);
    listenSignUp();
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
