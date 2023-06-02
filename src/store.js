// import newContact from "./pages/new-contact-page.js";
import { getContacts } from "./services/contacts-service.js";

async function fetchContacts() {
  const contacts = await getContacts();

  this.contacts = contacts;

  this.favorite = contacts.filter((contact) => contact.favorite === true);
}

const STORE = {
  user: null,
  contacts: [],
  favorites: [],
  edit: {},
  currentTab: "Contactable",
  fetchContacts,
};

export default STORE;
