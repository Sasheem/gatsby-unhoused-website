import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import './cards.scss';

const CardCallToAction = ({ title, text, link, destination, fixed }) => (
  <div className="card-call-to-action">
    <div className="card-header">
      <Img
        className="card-image"
        fixed={fixed}
        alt={`${title} blog post image`}
      />
    </div>
    <div className="card-call-to-action-content-container">
      <div className="card-spacer" />
      <div className="card-call-to-action-content">
        <h4>{title}</h4>
        <p>{text}</p>
        <Link className="card-call-to-action-link" to={destination}>
          {link}
        </Link>
      </div>
      <div className="card-spacer" />
    </div>
  </div>
);

export default CardCallToAction;
