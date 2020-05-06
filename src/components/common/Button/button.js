import React from 'react';
import { Link } from 'gatsby';

import './button.scss';

const Button = ({ label, destination, userProfile }) => (
  <Link
    className="button-link"
    to={`/${destination}`}
    state={userProfile !== null ? { userProfile } : {}}
  >
    <div className="button">{label}</div>
  </Link>
);

export default Button;
