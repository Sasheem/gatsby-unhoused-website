import React, { useState, useEffect } from 'react';

import CardDashboardMetric from '../Cards/cardDashboardMetric';

import './dashboard.scss';

const UserMetrics = ({ firebase, user }) => {
  const [donations, setDonations] = useState([]);
  const [totalImpacted, setTotalImpacted] = useState(0);
  const [totalContribution, setTotalContribution] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    if (firebase && user) {
      const unsubscribe = firebase.subscribeToDonations({
        username: user.username,
        onSnapshot: snapshot => {
          const snapshotDonations = [];
          snapshot.forEach(doc => {
            snapshotDonations.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setDonations(snapshotDonations);
        },
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, []);

  // Form metrics within this useEffect
  useEffect(() => {
    const tempClients = [];
    let tempImpacted = 0;
    let tempContributions = 0;

    if (donations.length !== 0) {
      console.dir(donations.length);
      donations.forEach(element => {
        console.dir(element);
        tempContributions += element.amount;

        if (!tempClients.includes(element.client)) {
          tempImpacted += element.familySize;
          tempClients.push(element.client);
        }
      });

      setTotalDonations(donations.length);
      setTotalContribution(tempContributions);
      setTotalImpacted(tempImpacted);
    }
  }, [donations]);

  return (
    <div className="dashboard-item">
      <div className="dashboard-row">
        <CardDashboardMetric
          name="Lifetime Contribution"
          value={`$${totalContribution}`}
        />
        <CardDashboardMetric name="Donations" value={totalDonations} />
        <CardDashboardMetric name="Lives Impacted" value={totalImpacted} />
      </div>
    </div>
  );
};

export default UserMetrics;
