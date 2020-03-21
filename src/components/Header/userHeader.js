import React from 'react';
import { Link } from 'gatsby';

import './header.scss';

const UserHeader = () => (
  <div className="dashboard-navbar-items">
    <ul>
      <li>
        <Link className="navbar-link" to="/">
          Refer a client
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/">
          Make a donation
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/">
          Settings
        </Link>
      </li>
    </ul>
  </div>
);

export default UserHeader;
