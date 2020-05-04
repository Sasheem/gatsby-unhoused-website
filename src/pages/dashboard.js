import React, { useContext, useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';

import SEO from '../components/seo';
import { FirebaseContext } from '../components/Firebase';

import CardUser from '../components/Cards/cardUser';
import RoleUser from '../components/Dashboard/roleUser';
import RoleAdmin from '../components/Dashboard/roleAdmin';

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
          {user && <CardUser firebase={firebase} user={user} />}
        </div>
        {user && !!user.isAdmin && <RoleAdmin />}
        {user && !user.isAdmin && <RoleUser />}
        <div />
      </div>
    </div>
  );
};

export default Dashboard;
