import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../Firebase';

import Image from '../image';
import Button from '../common/Button/button';

import './header.scss';

/**
 * todo - link user email <li> to /dashboard
 */

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext);

  function handleLogoutClick() {
    firebase.logout().then(() => navigate('/login'));
  }
  console.dir(user);
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <h1 className="logo">Unhoused Humanity</h1>
            {/* <Image /> */}
            {/* <img
            className="logo"
            src="/images/logo-dark-alegreya-sans-sc.png"
            alt="unhoused humanity logo"
          /> */}
          </Link>
        </div>
        <div className="spacer" />
        <div className="navbar-content">
          <div className="navbar-actions">
            <Button label="Donate" destination="/" />
            <Button label="Volunteer" destination="/" />
            <Button label="Contact" destination="/" />
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
                  <Link className="navbar-link" to="/">
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
