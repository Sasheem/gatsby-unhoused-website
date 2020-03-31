import React from 'react';
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

const CardUser = () => {
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
  return (
    <div className="card-component">
      <div className="card-head">
        <div className="card-image">
          <Img
            fluid={data.userImage.childImageSharp.fluid}
            alt={data.userImage.base.split('.')[0]}
          />
        </div>
        <div className="card-title">
          <h1>SasheemDev</h1>
          <h2>Sasheem</h2>
        </div>
      </div>
      <div className="divider">
        <HorizontalDivider />
      </div>
      <p>
        I'm a dog dad, a star wars fan, and an avid video gamer. The homeless
        need a voice. I give back to the community when I can.
      </p>
      <div className="card-row">
        <div className="card-user-icon">
          <WorkplaceIcon />
        </div>
        <p>Web Developer</p>
      </div>
      <div className="card-row">
        <div className="card-user-icon">
          <LocationIcon />
        </div>
        <p>Tallahassee, FL</p>
      </div>
      <div className="card-row">
        <div className="card-user-icon">
          <MailIcon />
        </div>
        <p>sasheem@sasheemdev.com</p>
      </div>
      <div className="card-row">
        <div className="card-user-icon">
          <WebsiteIcon />
        </div>
        <a href="https://sasheem.dev" target="_blank">
          sasheem.dev
        </a>
      </div>
    </div>
  );
};

export default CardUser;
