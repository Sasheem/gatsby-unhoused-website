import React from 'react';

import './cards.scss';

const CardDashboardMetric = ({ name, value }) => (
  <div className="card-dashboard-metric">
    <h3>{name}</h3>
    <p>{value}</p>
  </div>
);

export default CardDashboardMetric;
