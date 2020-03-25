import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';
import MetricsDashboard from '../components/Dashboard/metrics';
import UserHeader from '../components/Header/userHeader';
import DonationsDashboard from '../components/Dashboard/donations';
import CardUser from '../components/Cards/cardUser';

import '../styles/global.scss';

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
          <p>Dashboard Menu</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
