import React from 'react';

import './cards.scss';

const CardProfileMetric = ({ name, value }) => (
  <div className={`card-metric-component card-border-lg`}>
    <h2>{value}</h2>
    <p>{name}</p>
  </div>
);

export default CardProfileMetric;
