import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  if (!auth.isLoggedIn) {
    return null;
  }
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink to="/articles">ARTICLES</NavLink>
      </li>
      <li>
        <NavLink to="/comments">COMMENTS</NavLink>
      </li>
      <li>
        <NavLink to="/admins">ADMINS</NavLink>
      </li>
      <li>
        <NavLink to="/settings">SETTINGS</NavLink>
      </li>
      <li>
        <button onClick={auth.logout}>LOGOUT</button>
      </li>
    </ul>
  );
};

export default NavLinks;
