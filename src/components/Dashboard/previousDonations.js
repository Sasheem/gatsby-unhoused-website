import React from 'react';

import CardDonationMetric from '../Cards/cardDonationMetric';
import { HorizontalDivider } from '../common';

import './dashboard.scss';

/**
 * todo frontend modify data to come from array in props
 */

const PreviousDonations = () => (
  <div className="dashboard-donations-content">
    <div className="dashboard-donation-row">
      <CardDonationMetric name="Date" value="03/20/20" />
      <CardDonationMetric name="Client Name" value="Shonda" />
      <CardDonationMetric name="Amount" value="$25" />
      <CardDonationMetric name="Payment" value="**** 4719" />
    </div>
    <HorizontalDivider />
    <div className="dashboard-donation-row">
      <CardDonationMetric name="Date" value="03/20/20" />
      <CardDonationMetric name="Client Name" value="Shonda" />
      <CardDonationMetric name="Amount" value="$25" />
      <CardDonationMetric name="Payment" value="**** 4719" />
    </div>
    <HorizontalDivider />
    <div className="dashboard-donation-row">
      <CardDonationMetric name="Date" value="03/20/20" />
      <CardDonationMetric name="Client Name" value="Shonda" />
      <CardDonationMetric name="Amount" value="$25" />
      <CardDonationMetric name="Payment" value="**** 4719" />
    </div>
    <HorizontalDivider />
    <div className="dashboard-donation-row">
      <CardDonationMetric name="Date" value="03/20/20" />
      <CardDonationMetric name="Client Name" value="Shonda" />
      <CardDonationMetric name="Amount" value="$25" />
      <CardDonationMetric name="Payment" value="**** 4719" />
    </div>
  </div>
);

export default PreviousDonations;
