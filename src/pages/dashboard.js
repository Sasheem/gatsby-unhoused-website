import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';
import MetricsDashboard from '../components/Dashboard/metrics';
import UserHeader from '../components/Header/userHeader';
import DonationsDashboard from '../components/Dashboard/donations';

import '../styles/global.scss';

const Dashboard = ({ location }) => {
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  console.dir(user);

  return (
    <div className="page-body-dashboard">
      <SEO title="User dashboard" />
      <h1>Dashboard</h1>
      <MetricsDashboard />
      <UserHeader />
      <DonationsDashboard />
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default Dashboard;
