import React from 'react';
import { Link } from 'gatsby';

import WorkplaceIcon from '../../assets/user-friends-solid.svg';
import LocationIcon from '../../assets/map-marker-alt-solid.svg';
import MailIcon from '../../assets/envelope-solid.svg';
import WebsiteIcon from '../../assets/link-solid.svg';

import './cards.scss';

const CardUser = ({ userProfile, downloadURL, username }) => {
  return (
    <div className="card-component">
      <div className="card-head">
        <Link to="/donorProfile" state={{ userProfile, downloadURL, username }}>
          <div className="card-image">
            {userProfile && downloadURL ? (
              <img
                src={downloadURL}
                alt={`${userProfile.firstName} profile picture`}
              />
            ) : (
              <div className="card-image-filler" />
            )}
          </div>
        </Link>
        <div className="card-title">
          <h1>{username ? username : 'No user'}</h1>
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
