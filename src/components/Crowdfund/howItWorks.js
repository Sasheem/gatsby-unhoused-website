import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';

import '../../styles/global.scss';

const HowItWorks = () => {
  const data = useStaticQuery(graphql`
    fragment processHowImage on File {
      base
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    query {
      processHowOne: file(relativePath: { eq: "how1.jpg" }) {
        ...processHowImage
      }
      processHowTwo: file(relativePath: { eq: "how2.jpg" }) {
        ...processHowImage
      }
      processHowThree: file(relativePath: { eq: "how3.jpg" }) {
        ...processHowImage
      }
      processHowFour: file(relativePath: { eq: "how4.jpg" }) {
        ...processHowImage
      }
      processHowFive: file(relativePath: { eq: "how5.jpg" }) {
        ...processHowImage
      }
    }
  `);
  const {
    processHowOne,
    processHowTwo,
    processHowThree,
    processHowFour,
    processHowFive,
  } = data;
  return (
    <div className="steps-container">
      <h2>How It Works</h2>
      <div className="steps-row">
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <Img
              className="steps-img"
              fluid={processHowOne.childImageSharp.fluid}
              alt={processHowOne.base.split('.')[0]}
            />
          </div>
          <div className="steps-fill" />
        </div>
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <h3>Family seeks homeless shelter</h3>
            <p>Details or statistics regarding homeless shelters</p>
            <Link className="page-link" to="/">
              Kearney Center
            </Link>
          </div>
          <div className="steps-fill" />
        </div>
      </div>
      <div className="steps-row reverse">
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <Img
              className="steps-img"
              fluid={processHowTwo.childImageSharp.fluid}
              alt={processHowTwo.base.split('.')[0]}
            />
          </div>
          <div className="steps-fill" />
        </div>
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <h3>Family learns about Unhoused Humanity</h3>
            <p>
              Details or statistics about Unhoused Humanity receiving clients
              from shelters
            </p>
            <Link className="page-link" to="/about">
              About us
            </Link>
          </div>
          <div className="steps-fill" />
        </div>
      </div>
      <div className="steps-row">
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <Img
              className="steps-img"
              fluid={processHowThree.childImageSharp.fluid}
              alt={processHowThree.base.split('.')[0]}
            />
          </div>
          <div className="steps-fill" />
        </div>
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <h3>Case worker submits referral to Unhoused Humanity</h3>
            <p>Details about case workers and what they do</p>
            <Link className="page-link" to="/">
              Case workers
            </Link>
          </div>
          <div className="steps-fill" />
        </div>
      </div>
      <div className="steps-row reverse">
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <Img
              className="steps-img"
              fluid={processHowFour.childImageSharp.fluid}
              alt={processHowFour.base.split('.')[0]}
            />
          </div>
          <div className="steps-fill" />
        </div>
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <h3>Donors fund a client</h3>
            <p>Details or statistics about donations</p>
            <Link className="page-link" to="/contactDonate">
              Donate
            </Link>
          </div>
          <div className="steps-fill" />
        </div>
      </div>
      <div className="steps-row">
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <Img
              className="steps-img"
              fluid={processHowFive.childImageSharp.fluid}
              alt={processHowFive.base.split('.')[0]}
            />
          </div>
          <div className="steps-fill" />
        </div>
        <div className="steps-content-container">
          <div className="steps-fill" />
          <div className="steps-content">
            <h3>Donors receive client updates</h3>
            <p>Sign up for an account to manage updates</p>
            <Link className="page-link" to="/register">
              Sign up
            </Link>
          </div>
          <div className="steps-fill" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
