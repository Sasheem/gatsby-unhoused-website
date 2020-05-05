import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';

import { FirebaseContext } from '../Firebase';
import './styles.scss';

const SideMenu = ({ show, hideBackdrop }) => {
  let drawerClasses = show ? 'side-drawer open' : 'side-drawer';
  const { firebase = null, user } = useContext(FirebaseContext) || {};

  function handleLogoutClick() {
    firebase.logout().then(() => {
      hideBackdrop();
      navigate('/login');
    });
  }

  return (
    <nav className={drawerClasses}>
      <ul className="action-menu">
        <li>
          <Link to="/contactDonate" onClick={hideBackdrop}>
            Donate
          </Link>
        </li>
        <li>
          <Link to="/contactVolunteer" onClick={hideBackdrop}>
            Volunteer
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={hideBackdrop}>
            Contact
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/about" onClick={hideBackdrop}>
            About
          </Link>
        </li>
        <li>
          <Link to="/crowdfund" onClick={hideBackdrop}>
            Crowdfunding
          </Link>
        </li>
        <li>
          <Link to="/stories" onClick={hideBackdrop}>
            Stories
          </Link>
        </li>
        {!!user && !!user.email && (
          <li>
            <Link
              className="navbar-link"
              to="/dashboard"
              onClick={hideBackdrop}
            >
              Hello, {user.username || user.email}
            </Link>
          </li>
        )}
        {user && user.email && (
          <li>
            <span onClick={handleLogoutClick} className="logout-link">
              Logout
            </span>
          </li>
        )}
        {!user && (
          <span>
            <li>
              <Link to="/login" onClick={hideBackdrop}>
                Log In
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={hideBackdrop}>
                Sign Up
              </Link>
            </li>
          </span>
        )}
      </ul>
    </nav>
  );
};

export default SideMenu;
