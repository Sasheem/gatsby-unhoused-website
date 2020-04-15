import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

import {
  AlternatingSection,
  AlternatingRow,
  AlternatingImage,
  AlternatingText,
  Content,
  Image,
  Fill,
} from '../common/alternatingInfo';

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
        <AlternatingSection>
          <h2>The Unhoused Humanity Process</h2>
          <AlternatingRow reverse={false}>
            <AlternatingImage>
              <Fill />
              <Content>
                <Image fluid={dataProcessOne} alt="Process One" />
              </Content>
              <Fill />
            </AlternatingImage>
            <AlternatingText>
              <Fill />
              <Content>
                <h3>Client seeks help</h3>
                <p>
                  We identify homeless individuals with a stable income that
                  cannot afford down payments on rent.
                </p>
                <Link className="page-link" to="/stories">
                  Success stories
                </Link>
              </Content>
              <Fill />
            </AlternatingText>
          </AlternatingRow>
          <AlternatingRow reverse={true}>
            <AlternatingImage>
              <Fill />
              <Content>
                <Image fluid={dataProcessTwo} alt="Process Two" />
              </Content>
              <Fill />
            </AlternatingImage>
            <AlternatingText>
              <Fill />
              <Content>
                <h3>Donor funds the client</h3>
                <p>
                  You select the family in need, read their story, and fund
                  their start.
                </p>
                <Link className="page-link" to="/crowdfund">
                  Crowdfunding
                </Link>
              </Content>
              <Fill />
            </AlternatingText>
          </AlternatingRow>
          <AlternatingRow reverse={false}>
            <AlternatingImage>
              <Fill />
              <Content>
                <Image fluid={dataProcessThree} alt="Process Three" />
              </Content>
              <Fill />
            </AlternatingImage>
            <AlternatingText>
              <Fill />
              <Content>
                <h3>Donor receives client updates</h3>
                <p>
                  Track their progress! Once they are fully funded, you will
                  receive an update of the family in their new home.
                </p>
                <Link className="page-link" to="/register">
                  Sign up today
                </Link>
              </Content>
              <Fill />
            </AlternatingText>
          </AlternatingRow>
        </AlternatingSection>
      );
    }}
  />
);

export default Process;
