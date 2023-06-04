// import newContact from "./pages/new-contact-page.js";
import { getContacts } from "./services/contacts-service.js";

async function fetchContacts() {
  const contacts = await getContacts();

  this.contacts = contacts.sort((a, b) =>
    a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  );

  this.favorites = contacts.filter((contact) => contact.favorite === true);
}

async function updateContactLocal(id, data) {
  let contact = this.contacts.find((contact) => contact.id == id);
  const { favorite, name, number, email, relation, ...rest } = contact;
  const index = this.contacts.indexOf(contact);
  contact = {
    favorite:
      data.favorite === true || data.favorite === false
        ? data.favorite
        : favorite,
    name: data.name ? data.name : name,
    number: data.number ? data.number : number,
    email: data.email ? data.email : email,
    relation: data.relation ? data.relation : relation,
    ...rest,
  };
  this.contacts.splice(index, 1, contact);

  this.contacts = this.contacts.sort((a, b) =>
    a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  );

  this.favorites = this.contacts.filter((contact) => contact.favorite === true);
}

const STORE = {
  user: null,
  contacts: [],
  favorites: [],
  edit: {},
  details: {},
  errors: {},
  currentTab: "Contactable",
  fetchContacts,
  updateContactLocal,
};

export default STORE;
