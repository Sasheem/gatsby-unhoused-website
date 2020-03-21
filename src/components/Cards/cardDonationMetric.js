import React from 'react';

import './cards.scss';

const CardDonationMetric = ({ name, value }) => (
  <div className="card-donation-metric">
    <h4>{name}</h4>
    <p>{value}</p>
  </div>
);

export default CardDonationMetric;
