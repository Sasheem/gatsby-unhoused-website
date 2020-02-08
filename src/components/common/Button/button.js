import React from 'react';
import { Link } from 'gatsby';

import './button.scss';

const Button = ({ label, destination }) => (
  <div className="button">
    <Link className="button-link" to={`/${destination}`}>
      {label}
    </Link>
  </div>
);

export default Button;
