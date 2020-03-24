import React from 'react';
import { Link } from 'gatsby';

import './styles.scss';

const SideMenu = ({ show }) => {
  let drawerClasses = show ? 'side-drawer open' : 'side-drawer';
  return (
    <nav className={drawerClasses}>
      <ul className="action-menu">
        <li>
          <Link to="/contactDonate">
            <a>Donate</a>
          </Link>
        </li>
        <li>
          <Link to="/contactVolunteer">
            <a>Volunteer</a>
          </Link>
        </li>
        <li>
          <Link to="/contactHelp">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link to="/crowdfund">
            <a>Crowdfunding</a>
          </Link>
        </li>
        <li>
          <Link to="/stories">
            <a>Stories</a>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <a>Log In</a>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <a>Sign Up</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
