import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteAction, setCurrent, clearCurrent } = contactContext;
  const { id, name, phone, email, type } = contact;

  const onDelete = () => {
    deleteAction(id);
    clearCurrent();
  };
  const setCurrentContact = () => {
    setCurrent(contact);
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          className={`badge ${
            type === 'professional' ? 'badge-success' : 'badge-primary'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        <li>
          {' '}
          {email && (
            <div>
              <i class="fas fa-envelope"></i> {email}
            </div>
          )}
        </li>
        <li>
          {' '}
          {phone && (
            <div>
              <i class="fas fa-phone"></i> {phone}
            </div>
          )}
        </li>
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={setCurrentContact}>
          {' '}
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          {' '}
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
