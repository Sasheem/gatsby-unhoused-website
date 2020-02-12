import React from 'react';

import './cards.scss';

const CardMetric = ({ name, value }) => (
  <div className="card-metric-content">
    <h2>{value}</h2>
    <p>{name}</p>
  </div>
);

export default CardMetric;
