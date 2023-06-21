import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import LoginForm from './LogForm/LoginForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

export function App(params) {
const [contacts, setContacts] = useState([]);
const [filter, setFilter] = useState('');

useEffect(() => {
  const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts'));
  if (contactsFromLocalStorage && contactsFromLocalStorage.length > 0) {
    setContacts(contactsFromLocalStorage);
  }
}, []);


useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);

console.log(contacts);


  const handleInputChange = e => {
    setFilter(e.target.value);
  };

  const filteredContact = () => {
    return contacts.filter(({ name }) =>
      name.toUpperCase().includes(filter.toUpperCase())
    );
  };

  const handleSubmit = (values, actions) => {
    const contactId = nanoid();
    if (contacts.some(item => item.name === values.name)) {
      alert(`${values.name} is already in contacts`);
      return;
    }
    const newContact = {
      id: contactId,
      name: values.name,
      number: values.phoneNumber.toString(),
    };
    setContacts([...contacts, newContact]);
    actions.resetForm();
  };

  const onDeleteContact = trueId => {
    setContacts(
      contacts.filter(({ id }) => id !== trueId),
      () => {
        localStorage.setItem('contacts', JSON.stringify([...contacts]));
      }
    );
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} contacts={contacts} />
      <Filter onInputChange={handleInputChange} />
      <ContactsList
        filter={filteredContact}
        onDeleteContact={onDeleteContact}
      />
    </>
  );
}
