import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';
import MetricsDashboard from '../components/Dashboard/metrics';
import UserHeader from '../components/Header/userHeader';
import DonationsDashboard from '../components/Dashboard/donations';
import CardUser from '../components/Cards/cardUser';
import BioForm from '../components/Dashboard/bioForm';

import '../styles/global.scss';
import 'react-tabs/style/react-tabs.css';

const Dashboard = ({ location }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  console.dir(user);

  return (
    <div className="page-body-dashboard">
      <SEO title="User dashboard" />
      <div className="dashboard-component">
        <div className="dashboard-head">
          <CardUser />
        </div>
        <div className="dashboard-body">
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Metrics</Tab>
              <Tab>Donations</Tab>
              <Tab>Clients</Tab>
              <Tab>Account</Tab>
              <Tab>Payment Information</Tab>
            </TabList>

            <TabPanel>
              <h2>Overview Content</h2>
            </TabPanel>
            <TabPanel>
              <h2>Metrics content</h2>
              <MetricsDashboard />
            </TabPanel>
            <TabPanel>
              <h2>Donations Content</h2>
              <DonationsDashboard />
            </TabPanel>
            <TabPanel>
              <h2>Clients Content</h2>
            </TabPanel>
            <TabPanel>
              <BioForm />
              <p>Implement form to update password</p>
            </TabPanel>
            <TabPanel>
              <h2>Payment Information Content</h2>
              <p>Implement form to adjust payment on file.. maybe</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
