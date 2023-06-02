import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
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
          ${input({
            id: "email",
            name: "email",
            placeholder: "email",
            type: "email",
            required: true,
            value: "",
          })}

          ${input({
            id: "password",
            name: "password",
            placeholder: "password",
            type: "password",
            required: true,
            value: "",
          })}

          ${
            loginError
              ? `<p class="text-center error-300">${loginError}</p>`
              : ""
          }
          <div class="login-buttons">
            <a href ="#" class="login-sign-up-button js-signup-link">Signup</a>
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
      console.log(STORE);
      // await STORE.fetchCategories();

      // DOMHandler.load(HomePage);
    } catch (error) {
      this.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}

const LoginPage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this);
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
