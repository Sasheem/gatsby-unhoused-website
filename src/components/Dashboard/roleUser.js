import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';

import UserMetrics from '../Dashboard/userMetrics';
import ClientsFunded from '../Dashboard/clientsFunded';
import Donations from '../Dashboard/donations';
import UpdateCreditCard from '../Stripe/updateCreditCard';
import SavedCreditCards from '../Stripe/savedCreditCards';
import BioForm from '../Dashboard/bioForm';
import PasswordForm from '../Dashboard/passwordForm';

import 'react-tabs/style/react-tabs.css';

const RoleUser = ({ firebase, user }) => {
  return (
    <div className="dashboard-body">
      <div />
      <Tabs>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Donations</Tab>
          <Tab>Payment Information</Tab>
          <Tab>Profile</Tab>
          <Tab>Password</Tab>
        </TabList>
        {/* User Dashboard Panel */}
        <TabPanel>
          <div className="dashboard-panel">
            <div className="dashboard-item">
              <div className="dashboard-item-header">
                <div>
                  <h3>Client Metrics</h3>
                </div>
                <div>
                  <p style={{ textAlign: 'right' }}>Date Joined:</p>
                  <p style={{ textAlign: 'right' }}>
                    {moment(user.metadata.creationTime).format('ll')}
                  </p>
                </div>
              </div>

              <UserMetrics firebase={firebase} user={user} />
            </div>
            <ClientsFunded user={user} />
          </div>
        </TabPanel>

        {/* User Donations Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <Donations firebase={firebase} user={user} />
          </div>
        </TabPanel>

        {/* User Payment Information Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <SavedCreditCards firebase={firebase} user={user} />
            <UpdateCreditCard firebase={firebase} user={user} />
          </div>
        </TabPanel>

        {/* User Profile Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <BioForm />
          </div>
        </TabPanel>
        {/* User Password Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <PasswordForm />
          </div>
        </TabPanel>
      </Tabs>
      <div />
    </div>
  );
};

export default RoleUser;
