import React, { useState, useContext, useEffect } from 'react';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';

import CardUser from '../components/Cards/cardUser';
import CardProfileMetric from '../components/Cards/cardProfileMetric';
import BlogGrid from '../components/Blog/blogGrid';
import Loader from '../components/common/Loader/loader';

import '../components/common/Metrics/metrics.scss';
import '../components/Dashboard/dashboard.scss';
import '../components/Blog/blog.scss';

const DonorProfile = ({ location }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};

  const [donations, setDonations] = useState([]);
  const [totalImpacted, setTotalImpacted] = useState(0);
  const [totalContribution, setTotalContribution] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  // find the clients donated by this donor
  useEffect(() => {
    if (firebase && location && location.state.username) {
      setLoading(true);
      firebase.getClients().then(snapshot => {
        // check if component is mounted
        if (isMounted) {
          const fundedClients = [];
          snapshot.forEach(doc => {
            if (doc.data().hasOwnProperty('fundedBy')) {
              if (doc.data().fundedBy.includes(`${location.state.username}`)) {
                fundedClients.push({
                  id: doc.id,
                  ...doc.data(),
                });
              }
            }
          });
          setClients(fundedClients);
          setLoading(false);
        }
        setLoading(false);
      });
    }
  }, [firebase]);

  useEffect(() => {
    if (firebase && location && location.state.username) {
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

  return (
    <div className="page-body-dashboard">
      <SEO title="Donor Profile" />
      <div className="dashboard-component">
        <div className="dashboard-head">
          <div />
          {location &&
            location.state &&
            location.state.userProfile &&
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
        <div className="donor-profile-panel">
          <div className="blog-grid">
            <CardProfileMetric
              name="Total Contribution"
              value={`$${totalContribution}`}
            />
            <CardProfileMetric name="Donations Made" value={totalDonations} />
            <CardProfileMetric name="Lives Impacted" value={totalImpacted} />
          </div>
          <div>
            <h3>Clients funded</h3>
            {loading === true ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : (
              clients.length !== 0 && (
                <div className="tab-content-clients">
                  <BlogGrid clients={clients} loading={loading} />
                </div>
              )
            )}
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default DonorProfile;
