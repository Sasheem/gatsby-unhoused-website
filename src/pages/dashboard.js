import React, { useContext, useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';
import Donations from '../components/Dashboard/donations';
import ClientsFunded from '../components/Dashboard/clientsFunded';
import BioForm from '../components/Dashboard/bioForm';
import PasswordForm from '../components/Dashboard/passwordForm';
import CardUser from '../components/Cards/cardUser';
import UpdateCreditCard from '../components/Stripe/updateCreditCard';
import SavedCreditCards from '../components/Stripe/savedCreditCards';
import AdminMetrics from '../components/Dashboard/adminMetrics';
import AdminAllClients from '../components/Dashboard/adminAllClients';
import AdminAddPartner from '../components/Dashboard/adminAddPartner';
import UserMetrics from '../components/Dashboard/userMetrics';

import '../styles/global.scss';
import 'react-tabs/style/react-tabs.css';
import AdminAddClient from '../components/Dashboard/adminAddClient';

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
          {user && <CardUser firebase={firebase} user={user} />}
        </div>
        <div className="dashboard-body">
          <Tabs>
            {user && !!user.isAdmin && (
              <TabList>
                <Tab>Dashboard</Tab>
                <Tab>Add Client</Tab>
                <Tab>Edit Client</Tab>
                <Tab>Add Partner</Tab>
                <Tab>Profile</Tab>
                <Tab>Password</Tab>
              </TabList>
            )}
            {user && !user.isAdmin ? (
              <TabList>
                <Tab>Dashboard</Tab>
                <Tab>Donations</Tab>
                <Tab>Payment Information</Tab>
                <Tab>Profile</Tab>
                <Tab>Password</Tab>
              </TabList>
            ) : null}

            {/* PANEL 1 */}
            <TabPanel>
              <div>
                {user && !user.isAdmin && (
                  <div>
                    <p style={{ textAlign: 'right' }}>Date Joined:</p>
                    <p style={{ textAlign: 'right' }}>
                      {moment(user.metadata.creationTime).format('ll')}
                    </p>
                    <UserMetrics firebase={firebase} user={user} />
                    <div className="tab-content-clients">
                      <ClientsFunded user={user} />
                    </div>
                  </div>
                )}
                {user && !!user.isAdmin && <AdminMetrics />}
              </div>
            </TabPanel>

            {/* PANEL 2 */}
            <TabPanel>
              <div className="tab-content-container">
                {user && !user.isAdmin && (
                  <Donations firebase={firebase} user={user} />
                )}
                {user && !!user.isAdmin && <AdminAddClient />}
              </div>
            </TabPanel>

            {/* PANEL 3 */}
            <TabPanel>
              <div className="tab-content-container">
                {user && !user.isAdmin && (
                  <span>
                    <SavedCreditCards firebase={firebase} user={user} />
                    <UpdateCreditCard firebase={firebase} user={user} />
                  </span>
                )}
                {user && !!user.isAdmin && <AdminAllClients />}
              </div>
            </TabPanel>

            {/* PANEL 4 */}
            {user && !!user.isAdmin && (
              <TabPanel>
                <div className="tab-content-container">
                  <AdminAddPartner />
                </div>
              </TabPanel>
            )}

            {/* PANEL 5 */}
            <TabPanel>
              <div className="tab-content-container">
                <BioForm />
              </div>
            </TabPanel>

            {/* PANEL 6 */}
            <TabPanel>
              <div className="tab-content-container">
                <PasswordForm />
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
