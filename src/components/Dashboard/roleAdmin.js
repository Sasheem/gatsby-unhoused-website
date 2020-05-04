import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import AdminMetrics from '../Dashboard/adminMetrics';
import AdminAddClient from '../Dashboard/adminAddClient';
import AdminAllClients from '../Dashboard/adminAllClients';
import AdminAddPartner from '../Dashboard/adminAddPartner';
import BioForm from '../Dashboard/bioForm';
import PasswordForm from '../Dashboard/passwordForm';

import 'react-tabs/style/react-tabs.css';

const RoleAdmin = () => {
  return (
    <div className="dashboard-body">
      <Tabs>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Add Client</Tab>
          <Tab>Edit Client</Tab>
          <Tab>Add Partner</Tab>
          <Tab>Profile</Tab>
          <Tab>Password</Tab>
        </TabList>

        {/* Admin Dashboard Panel */}
        <TabPanel>
          <div>
            <AdminMetrics />
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
      </Tabs>
    </div>
  );
};

export default RoleAdmin;
