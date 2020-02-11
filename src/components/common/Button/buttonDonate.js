import React from 'react';
import { Link } from 'gatsby';

import './button.scss';

const ButtonDonate = ({ label, destination }) => (
  <div className="button-donate">
    <Link className="button-link" to={`/${destination}`}>
      {label}
    </Link>
  </div>
);

export default ButtonDonate;
