import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../Firebase';

import Button from '../common/Button/button';
import Logo from './logo';
import MenuToggleButton from '../Layout/menuToggleButton';

import './header.scss';

const Header = ({ menuClickHandler }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};

  function handleLogoutClick() {
    firebase.logout().then(() => navigate('/login'));
  }
  console.log('currentUser:');
  console.dir(user);
  return (
    <header className="header">
      <nav className="navbar">
        <div className="spacer-sm" />
        <Logo />
        <div className="spacer" />
        <div className="navbar-content">
          <div className="navbar-actions">
            <Button label="Donate" destination="/contactDonate" />
            <Button label="Volunteer" destination="/contactVolunteer" />
            <Button label="Contact" destination="/contact" />
          </div>
          <div className="navbar-items">
            <ul>
              <li>
                <Link className="navbar-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/crowdfund">
                  Crowdfunding
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/stories">
                  Stories
                </Link>
              </li>
              {!!user && !!user.email && (
                <li>
                  <Link className="navbar-link" to="/dashboard">
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
              {(!user || !user.email) && (
                <li>
                  <Link to="/login" className="navbar-link">
                    Log In
                  </Link>
                  <span className="header-divider" />
                  <Link to="/register" className="navbar-link">
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-toggle-button">
          <MenuToggleButton click={menuClickHandler} />
        </div>
        <div className="spacer-md" />
      </nav>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
