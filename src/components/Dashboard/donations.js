import React from 'react';

import CardDonationMetric from '../Cards/cardDonationMetric';
import { HorizontalDivider } from '../common/';
import UpcomingDonations from './upcomingDonations';
import PreviousDonations from './previousDonations';

import './dashboard.scss';

/**
 * todo backend fetch donations from firebase
 * todo frontend render donations that belong to currently logged in user
 */

const DonationsDashboard = () => (
  <div className="dashboard-donations">
    <h3>Donations</h3>
    <PreviousDonations />
  </div>
);

export default DonationsDashboard;
