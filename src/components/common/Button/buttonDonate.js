import React from 'react';
import { Link } from 'gatsby';

import './button.scss';

const ButtonDonate = ({ label, destination, clientId }) => (
  <Link className="button-link" to={`/${destination}`} state={{ clientId }}>
    <div className="button-donate">{label}</div>
  </Link>
);

export default ButtonDonate;
