import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const TeamContainer = styled.div`
  width: 80vw;
  display: grid;
  grid-gap: 2em;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1fr 0.1fr;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 0.5fr 1fr 0.1fr;
  }
`;
const TeamGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 2em;

  @media only screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const Partner = styled.div`
  max-width: 10em;
`;

const Partners = ({ title }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allFile(
        filter: {
          ext: { regex: "/(png)/" }
          relativeDirectory: { eq: "partners" }
        }
      ) {
        edges {
          node {
            base
            childImageSharp {
              fluid {
                aspectRatio
                base64
                src
                srcSet
                sizes
              }
            }
          }
        }
      }
    }
  `);
  return (
    <TeamContainer>
      <h2>{title}</h2>
      <GridContainer>
        <div />
        <TeamGrid>
          {data.allFile.edges.map(({ node }) => (
            <Partner>
              <Img
                fluid={node.childImageSharp.fluid}
                alt={node.base.split('.')[0]}
              />
            </Partner>
          ))}
        </TeamGrid>
        <div />
      </GridContainer>
    </TeamContainer>
  );
};

export default Partners;
