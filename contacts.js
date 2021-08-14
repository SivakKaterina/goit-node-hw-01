// contacts.js
const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


//  Раскомментируй и запиши значение

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

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const contacts = await getContacts();
    console.table(contacts);
    return contacts;
  } catch (error) {
    throw error
  }
};

// listContacts();

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

// getContactById(1);

const removeContact = async (contactId) => {
    try {
      const contacts = await getContacts();
      const idx = contacts.findIndex((item) => item.id === +contactId);
      if (idx === -1) {
        throw new Error(`Contact with id=${contactId} not found`);
      }
      const newContacts = contacts.filter(item => item.id !== +contactId);
      await updateContacts(newContacts);
      // console.table(contacts[idx]);
      await listContacts();
       return contacts[idx];
  } catch (error) {
    console.log("ERROR", error.message);
  }
}

// removeContact(7);

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
    // await fs.writeFile(contactsPath, JSON.stringify(contacts));
    await updateContacts(contacts);
    await listContacts();

  } catch (error) {
    console.log("ERROR", error.message);
  }

};

// addContact("Kivi","kivi@gmail.com", "355-55-55" )



module.exports =  {
  listContacts,
  getContactById,
  removeContact,
  addContact
};