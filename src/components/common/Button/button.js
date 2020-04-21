import React from 'react';
import { Link } from 'gatsby';

import './button.scss';

const Button = ({ label, destination }) => (
  <Link className="button-link" to={`/${destination}`}>
    <div className="button">{label}</div>
  </Link>
);

export default Button;
