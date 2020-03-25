import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';

import { HorizontalDivider } from '../common';

import './cards.scss';

/**
 * todo change query to grab all user images and
 *  todo render the one that is matched with the logged in user
 * todo add icons 4 to each bio field
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
      <p>Front End Web Developer</p>
      <p>Tallahassee, FL</p>
      <p>sasheem@sasheemdev.com</p>
      <a href="https://sasheem.dev" target="_blank">
        sasheem.dev
      </a>
    </div>
  );
};

export default CardUser;
