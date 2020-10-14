import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';

import '../../styles/global.scss';

const Process = () => (
  <StaticQuery
    query={graphql`
      fragment processImage on File {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      query {
        processOne: file(relativePath: { eq: "process1.jpg" }) {
          ...processImage
        }
        processTwo: file(relativePath: { eq: "process2.jpg" }) {
          ...processImage
        }
        processThree: file(relativePath: { eq: "process3.jpg" }) {
          ...processImage
        }
      }
    `}
    render={data => {
      const dataProcessOne = data.processOne.childImageSharp.fluid;
      const dataProcessTwo = data.processTwo.childImageSharp.fluid;
      const dataProcessThree = data.processThree.childImageSharp.fluid;
      return (
        <div className="steps-container">
          <h2>The Unhoused Humanity Process</h2>
          <div className="steps-row">
            <div className="steps-content-container">
              <div className="steps-fill-responsive" />
              <div className="steps-content">
                <Img
                  className="steps-img"
                  fluid={dataProcessOne}
                  alt="Process One"
                />
              </div>
              <div className="steps-fill" />
            </div>
            <div className="steps-content-container">
              <div className="steps-fill" />
              <div className="steps-content">
                <h3>Client seeks help</h3>
                <p>
                  We identify homeless individuals with a stable income that
                  cannot afford down payments on rent.
                </p>
                <Link className="page-link" to="/stories">
                  Success stories
                </Link>
              </div>
              <div className="steps-fill-responsive" />
            </div>
          </div>
          <div className="steps-row reverse">
            <div className="steps-content-container">
              <div className="steps-fill" />
              <div className="steps-content">
                <Img
                  className="steps-img"
                  fluid={dataProcessTwo}
                  alt="Process Two"
                />
              </div>
              <div className="steps-fill-responsive" />
            </div>
            <div className="steps-content-container">
              <div className="steps-fill-responsive" />
              <div className="steps-content">
                <h3>Donor funds the client</h3>
                <p>
                  You select the family in need, read their story, and fund
                  their start.
                </p>
                <Link className="page-link" to="/crowdfund">
                  Crowdfunding
                </Link>
              </div>
              <div className="steps-fill" />
            </div>
          </div>
          <div className="steps-row">
            <div className="steps-content-container">
              <div className="steps-fill-responsive" />
              <div className="steps-content">
                <Img
                  className="steps-img"
                  fluid={dataProcessThree}
                  alt="Process Three"
                />
              </div>
              <div className="steps-fill" />
            </div>
            <div className="steps-content-container">
              <div className="steps-fill" />
              <div className="steps-content">
                <h3>Donor receives client updates</h3>
                <p>
                  Track their progress! Once they are fully funded, you will
                  receive an update of the family in their new home.
                </p>
                <Link className="page-link" to="/signUp">
                  Sign up today
                </Link>
              </div>
              <div className="steps-fill-responsive" />
            </div>
          </div>
        </div>
      );
    }}
  />
);

export default Process;
