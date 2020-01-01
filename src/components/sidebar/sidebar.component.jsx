import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Archive, Settings, MessageSquare, Users } from 'react-feather';

import './sidebar.styles.scss';

const Sidebar = () => (
  <nav className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="active" className="nav-link">
            <Home className="feather" />
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/articles" className="nav-link" activeClassName="active">
            <Archive className="feather" />
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/comments" className="nav-link" activeClassName="active">
            <MessageSquare className="feather" />
            Instructor Comments
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admins" className="nav-link" activeClassName="active">
            <Users className="feather" />
            Admins
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="nav-link" activeClassName="active">
            <Settings className="feather" />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Sidebar;
