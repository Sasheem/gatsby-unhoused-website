import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import AdminMetrics from '../Dashboard/adminMetrics';
import FeaturedClients from '../Home/featuredClients';
import RecentlyHoused from '../Dashboard/recentlyHoused';
import AdminAddClient from '../Dashboard/adminAddClient';
import AdminAllClients from '../Dashboard/adminAllClients';
import AdminAddPartner from '../Dashboard/adminAddPartner';
import AdminAllPartners from '../Dashboard/adminAllPartners';
import BioForm from '../Dashboard/bioForm';
import PasswordForm from '../Dashboard/passwordForm';
import Donations from '../Dashboard/donations';
import UpdateCreditCard from '../Stripe/updateCreditCard';
import SavedCreditCards from '../Stripe/savedCreditCards';

import 'react-tabs/style/react-tabs.css';

const RoleAdmin = ({ firebase, user }) => {
  return (
    <div className="dashboard-body">
      <div />
      <Tabs>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Add Client</Tab>
          <Tab>Edit Client</Tab>
          <Tab>Add Partner</Tab>
          <Tab>Edit Partner</Tab>
          <Tab>Profile</Tab>
          <Tab>Password</Tab>
          <Tab>Donations</Tab>
          <Tab>Payment</Tab>
        </TabList>

        {/* Admin Dashboard Panel */}
        <TabPanel>
          <div className="dashboard-panel">
            <AdminMetrics />
            <div className="dashboard-item">
              <h3>Currently Funding</h3>
              <FeaturedClients firebase={firebase} isAdmin={true} />
            </div>
            <div className="dashboard-item">
              <h3>Recently Housed</h3>
              <RecentlyHoused firebase={firebase} isAdmin={true} />
            </div>
          </div>
        </TabPanel>

        {/* Admin Add Client Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <AdminAddClient />
          </div>
        </TabPanel>

        {/* Admin Edit Client Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <AdminAllClients />
          </div>
        </TabPanel>

        {/* Admin Add Partner Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <AdminAddPartner />
          </div>
        </TabPanel>

        {/* Admin Edit Partner Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <AdminAllPartners />
          </div>
        </TabPanel>

        {/* Admin Profile Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <BioForm />
          </div>
        </TabPanel>

        {/* Admin Password Panel */}
        <TabPanel>
          <div className="tab-content-container">
            <PasswordForm />
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
      </Tabs>
      <div />
    </div>
  );
};

export default RoleAdmin;
