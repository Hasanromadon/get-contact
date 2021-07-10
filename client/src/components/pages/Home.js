import React, { Fragment } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
const Home = () => {
  return (
    <div>
      <ContactForm />
      <ContactFilter />
      <Contacts />
    </div>
  );
};

export default Home;
