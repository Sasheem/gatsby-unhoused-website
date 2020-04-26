import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../components/Firebase';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';

import { HorizontalDivider } from '../common';
import WorkplaceIcon from '../../assets/user-friends-solid.svg';
import LocationIcon from '../../assets/map-marker-alt-solid.svg';
import MailIcon from '../../assets/envelope-solid.svg';
import WebsiteIcon from '../../assets/link-solid.svg';

import './cards.scss';

/**
 * todo change query to grab all user images and
 * todo render the one that is matched with the logged in user
 * todo add edit field button to bottom right of component
 * todo add dynamic form component
 */

const CardUser = ({ firebase, user }) => {
  const data = useStaticQuery(graphql`
    query {
      userImage: file(relativePath: { eq: "profile-sasheem.jpg" }) {
        base
        childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  // const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [userProfile, setUserProfile] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (firebase && user) {
      firebase.getUser({ userId: user.username }).then(snapshot => {
        if (isMounted) {
          setUserProfile(snapshot.data());
        }
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
    }
  }, [firebase]);

  return (
    <div className="card-component">
      <div className="card-head">
        <div className="card-image">
          {userProfile && userProfile.profilePicture && downloadURL ? (
            <img
              src={downloadURL}
              alt={`${userProfile.firstName} profile picture`}
            />
          ) : (
            <div className="card-image-filler" />
          )}
        </div>
        <div className="card-title">
          <h1>{user ? user.username : 'No user'}</h1>
          {userProfile && userProfile.firstName && (
            <h2>{userProfile.firstName}</h2>
          )}
        </div>
      </div>
      <div className="card-divider" />
      {userProfile && userProfile.bio && <p>{userProfile.bio}</p>}
      {userProfile && userProfile.workplace && (
        <div className="card-row">
          <div className="card-user-icon">
            <WorkplaceIcon />
          </div>
          <p>{userProfile.workplace}</p>
        </div>
      )}
      {userProfile && userProfile.email && (
        <div className="card-row">
          <div className="card-user-icon">
            <MailIcon />
          </div>
          <p>{userProfile.email}</p>
        </div>
      )}
      {userProfile && userProfile.website && (
        <div className="card-row">
          <div className="card-user-icon">
            <WebsiteIcon />
          </div>
          <a href={userProfile.website} target="_blank">
            {userProfile.website.split('/')[2]}
          </a>
        </div>
      )}
      {/* <div className="card-row">
        <div className="card-user-icon">
          <LocationIcon />
        </div>
        <p>Tallahassee, FL</p>
      </div> */}
    </div>
  );
};

export default CardUser;
