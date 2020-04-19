import React from 'react';
import { Link } from 'gatsby';

import './button.scss';

const ButtonDonateStory = ({ label, destination, clientId }) => (
  <Link className="button-link" to={`/${destination}`} state={{ clientId }}>
    <div className="button-donate-story">{label}</div>
  </Link>
);

export default ButtonDonateStory;
