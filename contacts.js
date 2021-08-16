const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("db", "contacts.json");
 
 const getContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error
  }
};

const updateContacts = async (contacts) => {
    const contactsctsString = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, contactsctsString);
};

const listContacts = async () => {
  try {
    const contacts = await getContacts();
    console.table(contacts);
    return contacts;
  } catch (error) {
    throw error
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();
    const selectedContact = contacts.find((item) => item.id === +contactId);
    if (!selectedContact) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    console.table(selectedContact);
    return selectedContact;
  } catch (error) {
    console.log("ERROR", error.message);
  }
};

const removeContact = async (contactId) => {
    try {
      const contacts = await getContacts();
      const idx = contacts.findIndex((item) => item.id === +contactId);
      if (idx === -1) {
        throw new Error(`Contact with id=${contactId} not found`);
      }
      const newContacts = contacts.filter(item => item.id !== +contactId);
      await updateContacts(newContacts);
      await listContacts();
       return contacts[idx];
  } catch (error) {
    console.log("ERROR", error.message);
  }
}

const addContact = async (name, email, phone) => {
  const contact = {
    id: uuidv4(),
    name: name,
    phone: phone,
    email: email,
  };

  try {
    const contacts = await getContacts();
    contacts.push(contact)
    await updateContacts(contacts);
    await listContacts();
  } catch (error) {
    console.log("ERROR", error.message);
  }

};

module.exports =  {
  listContacts,
  getContactById,
  removeContact,
  addContact
};