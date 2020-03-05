import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import '../../styles/global.scss';

const ProcessSection = styled.section`
  width: 100%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
`;
const ProcessRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 5em 0;
  h3,
  p {
    text-align: center;
  }

  @media only screen and (min-width: 800px) {
    flex-direction: row;
    text-align: left;
    h3,
    p {
      text-align: left;
    }

    ${({ reverse }) =>
      reverse &&
      `
        flex-direction: row-reverse;
    `}
  }
`;
const ProcessImage = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 1em;
`;
const ProcessText = styled(ProcessImage)``;
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3,
  p {
    margin-bottom: 1em;
  }
`;
const Image = styled(Img)`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 5px;
  object-fit: fill;
`;
const Fill = styled.div`
  flex: 0.3;
`;

const Process = () => (
  <StaticQuery
    query={graphql`
      fragment processImage on File {
        childImageSharp {
          fixed(width: 400) {
            ...GatsbyImageSharpFixed
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
      const dataProcessOne = data.processOne.childImageSharp.fixed;
      const dataProcessTwo = data.processTwo.childImageSharp.fixed;
      const dataProcessThree = data.processThree.childImageSharp.fixed;
      return (
        <ProcessSection>
          <h2>The Unhoused Humanity Process</h2>
          <ProcessRow reverse={false}>
            <ProcessImage>
              <Fill />
              <Content>
                <Image fixed={dataProcessOne} alt="Process One" />
              </Content>
              <Fill />
            </ProcessImage>
            <ProcessText>
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
            </ProcessText>
          </ProcessRow>
          <ProcessRow reverse={true}>
            <ProcessImage>
              <Fill />
              <Content>
                <Image fixed={dataProcessTwo} alt="Process Two" />
              </Content>
              <Fill />
            </ProcessImage>
            <ProcessText>
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
            </ProcessText>
          </ProcessRow>
          <ProcessRow reverse={false}>
            <ProcessImage>
              <Fill />
              <Content>
                <Image fixed={dataProcessThree} alt="Process Three" />
              </Content>
              <Fill />
            </ProcessImage>
            <ProcessText>
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
            </ProcessText>
          </ProcessRow>
        </ProcessSection>
      );
    }}
  />
);

export default Process;
