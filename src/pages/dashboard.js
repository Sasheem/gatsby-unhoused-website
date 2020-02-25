import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';

import '../styles/global.scss';

const Dashboard = ({ location }) => {
  const { firebase, user } = useContext(FirebaseContext);
  console.dir(user);

  return (
    <div className="page-body">
      <SEO title="User dashboard" />
      <h1>Hello from user dashboard</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default Dashboard;
