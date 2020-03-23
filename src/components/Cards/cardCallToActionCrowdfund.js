import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import './cards.scss';

const CardCallToActionCrowdfund = ({ text, link, destination, children }) => (
  <div className="card-call-to-action">
    <div className="card-icon">{children}</div>
    <div className="card-call-to-actions-crowdfund">
      <p>{text}</p>
      <Link className="card-call-to-action-link" to={destination}>
        {link}
      </Link>
    </div>
  </div>
);

export default CardCallToActionCrowdfund;
