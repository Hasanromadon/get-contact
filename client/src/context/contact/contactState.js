import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Hasan',
        email: 'hasan123@gmail.com',
        phone: 1111,
        type: 'personal',
      },
      {
        id: 2,
        name: 'ridwan',
        email: 'ridwan@gmail.com',
        phone: 222,
        type: 'professional',
      },
      {
        id: 3,
        name: 'Diana',
        email: 'diana@gmail.com',
        phone: 3333,
        type: 'professional',
      },
      {
        id: 4,
        name: 'Ica',
        email: 'ica@gmail.com',
        phone: 4444,
        type: 'personal',
      },
    ],
    filtered: null,
    current: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  //Add contact

  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //Delete contact

  const deleteAction = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };
  //set current contact

  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  //update contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };
  //filter contact
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };
  //delete current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };
  //fil

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteAction,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
