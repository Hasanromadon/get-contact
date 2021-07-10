import React from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/" />
          Home
        </li>
        <li>
          <Link to="/about" />
          About
        </li>
      </ul>
    </div>
  );
};

Navbar.propsTypes = {
  title: PropsTypes.string.isRequired,
  icon: PropsTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Concact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
