import React, { useContext, useState, useEffect } from 'react';

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
  const [userProfile, setUserProfile] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');
  const [profiledFetched, setProfileFetched] = useState(false);
  let isMounted = true;

  useEffect(() => {
    if (firebase && user) {
      const unsubscribe = firebase.subscribeToUserInfo({
        username: user.username,
        onSnapshot: snapshot => {
          console.log(`snapshot data: ${typeof snapshot.data()}`);
          setUserProfile(snapshot.data());
        },
      });

      firebase
        .getProfileDownloadURL({ username: user.username })
        .then(snapshot => {
          if (isMounted) {
            console.log(`snapshot is ${typeof snapshot}`);
            console.dir(snapshot);
            setDownloadURL(snapshot);
          }
        });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
        isMounted = false;
      };
    }
  }, [firebase, user]);

  return (
    <div className="page-body-dashboard">
      <SEO
        title="User dashboard"
        description="User has secure and private access to their manage their account with Unhoused Humanity."
      />
      <div className="dashboard-bg-grey">
        <div className="dashboard-component">
          <div className="dashboard-head">
            <div />
            {user && userProfile && (
              <CardUser
                userProfile={userProfile}
                downloadURL={downloadURL}
                username={user.username}
              />
            )}
            <div />
          </div>
          {user && !!user.isAdmin && (
            <RoleAdmin firebase={firebase} user={user} />
          )}
          {user && !user.isAdmin && userProfile && (
            <RoleUser
              firebase={firebase}
              user={user}
              userProfile={
                location.state.userProfile
                  ? location.state.userProfile
                  : userProfile
              }
            />
          )}
          <div />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
