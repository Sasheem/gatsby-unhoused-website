import React from 'react';
import { Link } from 'gatsby';

import './button.scss';

const ButtonDonate = ({ label, destination, clientId, fullyFund }) => (
  <Link
    className="button-link"
    to={`/${destination}`}
    state={{ clientId, fullyFund }}
  >
    <div className="button-donate">{label}</div>
  </Link>
);

export default ButtonDonate;
