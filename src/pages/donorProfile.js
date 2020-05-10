import React, { useState, useContext, useEffect } from 'react';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';

import CardUser from '../components/Cards/cardUser';
import CardDashboardMetric from '../components/Cards/cardDashboardMetric';

import '../components/Dashboard/dashboard.scss';

const DonorProfile = ({ location }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};

  const [donations, setDonations] = useState([]);
  const [totalImpacted, setTotalImpacted] = useState(0);
  const [totalContribution, setTotalContribution] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    if (firebase && location.state.username) {
      const unsubscribe = firebase.subscribeToDonations({
        username: location.state.username,
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

  console.log(`location.state.userProfile:`);
  console.dir(location.state.userProfile);
  console.dir(donations);

  return (
    <div className="page-body-dashboard">
      <SEO title="Donor Profile" />
      <div className="dashboard-component">
        <div className="dashboard-head">
          <div />
          {location.state.userProfile &&
            location.state.downloadURL &&
            location.state.username && (
              <CardUser
                userProfile={location.state.userProfile}
                downloadURL={location.state.downloadURL}
                username={location.state.username}
              />
            )}
          <div />
        </div>
        <div className="dashboard-panel">
          <div className="donor-profile-row">
            <CardDashboardMetric
              name="Lifetime Contribution"
              value={`$${totalContribution}`}
            />
            <CardDashboardMetric name="Donations" value={totalDonations} />
            <CardDashboardMetric name="Lives Impacted" value={totalImpacted} />
          </div>
          <p>Families funded by donor</p>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
