import React, { useContext, useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';
import MetricsDashboard from '../components/Dashboard/metrics';
import Donations from '../components/Stripe/donations';
import CardUser from '../components/Cards/cardUser';
import BioForm from '../components/Dashboard/bioForm';
import PasswordForm from '../components/Dashboard/passwordForm';
import UpdateCreditCard from '../components/Stripe/updateCreditCard';
import SavedCreditCards from '../components/Stripe/savedCreditCards';
import ClientsFunded from '../components/Dashboard/clientsFunded';

import '../styles/global.scss';
import 'react-tabs/style/react-tabs.css';

/**
 * todo figure out how to refresh the dashboard render with userProfile
 * * it gets set the 2nd time around but passes in an empty userProfile on 1st time
 * * only render UI if isMounted?
 */

const Dashboard = ({ location }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  // const [userProfile, setUserProfile] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // let isMounted = true;

  // // maybe I should only render the below content if isMounted is true?
  // useEffect(() => {
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // useEffect(() => {
  //   if (firebase && user) {
  //     setIsLoading(true);
  //     console.log(`dashboard useEffect running`);
  //     firebase.getUser({ userId: user.username }).then(snapshot => {
  //       setUserProfile(snapshot.data());
  //       console.log(`useEffect publicProfile: ${snapshot.data()}`);
  //       publicProfile = snapshot.data();
  //     });
  //   }
  //   return () => {
  //     setIsLoading(false);
  //   };
  // }, [firebase]);

  // console.log(`DASHBOARD userProfile: ${userProfile}`);
  // console.log(`publicProfile: ${publicProfile}`);

  return (
    <div className="page-body-dashboard">
      <SEO title="User dashboard" />
      <div className="dashboard-component">
        <div />
        <div className="dashboard-head">
          <CardUser />
        </div>
        <div className="dashboard-body">
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Donations</Tab>
              <Tab>Clients</Tab>
              <Tab>Profile</Tab>
              <Tab>Password</Tab>
              <Tab>Payment Information</Tab>
            </TabList>
            <TabPanel>
              <div className="tab-content-container">
                <h3>Overview Content</h3>
                <MetricsDashboard />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="tab-content-container">
                <Donations firebase={firebase} user={user} />
              </div>
            </TabPanel>
            <TabPanel>
              <h2>Clients you funded</h2>
              <ClientsFunded user={user} />
            </TabPanel>
            <TabPanel>
              <div className="tab-content-container">
                <BioForm />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="tab-content-container">
                <PasswordForm />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="tab-content-container">
                <SavedCreditCards firebase={firebase} user={user} />
                <UpdateCreditCard firebase={firebase} user={user} />
              </div>
            </TabPanel>
          </Tabs>
        </div>
        <div />
      </div>
    </div>
  );
};

export default Dashboard;
