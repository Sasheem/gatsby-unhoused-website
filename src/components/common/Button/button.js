import React from 'react';
import { Link } from 'gatsby';

import './button.scss';

const Button = ({ label, destination }) => (
  <div className="button">
    <Link to={`/${destination}`}>
      <a>{label}</a>
    </Link>
  </div>
);

export default Button;
