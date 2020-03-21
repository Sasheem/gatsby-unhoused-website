import React from 'react';

import CardDashboardMetric from '../Cards/cardDashboardMetric';

import '../../styles/global.scss';
import './dashboard.scss';

const MetricsDashboard = () => (
  <div className="dashboard-row">
    <CardDashboardMetric name="Clients Funded" value="25" />
    <CardDashboardMetric name="Donations Made" value="25" />
    <CardDashboardMetric name="Contribution" value="$125" />
  </div>
);

export default MetricsDashboard;
