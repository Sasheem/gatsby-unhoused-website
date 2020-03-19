import React from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';

import CardTeamMember from '../Cards/cardTeamMember';

const TeamContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 2em;
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 800px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;
const Member = styled.div`
  height: 10em;
  width: 10em;
  border-radius: 50%;
  overflow: hidden;
  background-color: lightskyblue;
`;

const Team = ({ title }) => (
  <StaticQuery
    query={graphql`
      fragment processMemberImage on File {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      query {
        developerImage: file(relativePath: { eq: "profile-sasheem.jpg" }) {
          ...processMemberImage
        }
        directorImage: file(relativePath: { eq: "profile-jackie.jpg" }) {
          ...processMemberImage
        }
      }
    `}
    render={data => {
      const dataDeveloperImage = data.developerImage.childImageSharp.fixed;
      const dataDirectorImage = data.directorImage.childImageSharp.fixed;
      return (
        <TeamContainer>
          <h2>{title}</h2>
          <Row>
            <Member />
            <CardTeamMember
              data={dataDeveloperImage}
              name="Sasheem"
              title="Web Developer"
            />
            <CardTeamMember
              data={dataDirectorImage}
              name="Jackie"
              title="Executive Director"
            />
            <Member />
          </Row>
        </TeamContainer>
      );
    }}
  />
);

export default Team;
