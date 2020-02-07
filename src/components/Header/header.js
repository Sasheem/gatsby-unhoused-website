import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../image';
import Button from '../common/Button/button';

import './header.scss';

const Header = ({ siteTitle }) => (
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
          </ul>
        </div>
      </div>
      <div className="spacer-md" />
    </nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
