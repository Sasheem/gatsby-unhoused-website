import React, { useContext, useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../Firebase';

import Button from '../common/Button/button';
import Logo from './logo';
import MenuToggleButton from '../Layout/menuToggleButton';

import './header.scss';

const Header = ({ menuClickHandler, hideBackdrop }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [userProfile, setUserProfile] = useState(null);
  let isMounted = true;

  useEffect(() => {
    if (firebase && isMounted && user) {
      firebase.getUser({ userId: user.username }).then(snapshot => {
        setUserProfile(snapshot.data());
      });
    }
    return () => {
      isMounted = false;
    };
  }, [firebase, user]);

  function handleLogoutClick() {
    firebase.logout().then(() => navigate('/login'));
  }

  return (
    <header className="header">
      <nav className="navbar">
        <Logo hideBackdrop={hideBackdrop} />
        <div className="spacer" />
        <div className="navbar-content">
          <div className="navbar-actions">
            <Button
              label="Donate"
              destination="/contactDonate"
              userProfile={user && userProfile !== null ? userProfile : null}
            />
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
                  <Link
                    className="navbar-link"
                    to="/dashboard"
                    state={{
                      userProfile:
                        user && userProfile !== null ? userProfile : null,
                    }}
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
              {(!user || !user.email) && (
                <li>
                  <Link to="/login" className="navbar-link">
                    Sign In
                  </Link>
                  <span className="header-divider" />
                  <Link to="/signUp" className="navbar-link">
                    Sign Up
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
