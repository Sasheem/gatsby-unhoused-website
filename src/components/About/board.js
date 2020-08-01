import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import CardTeamMember from '../Cards/cardTeamMember';

import '../../styles/global.scss';

const Board = ({ title }) => (
  <StaticQuery
    query={graphql`
      fragment processBoardImage on File {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      query {
        boardOne: file(relativePath: { eq: "profile-sam.jpg" }) {
          ...processMemberImage
        }
        boardTwo: file(relativePath: { eq: "profile-susan.jpg" }) {
          ...processMemberImage
        }
        boardThree: file(relativePath: { eq: "profile-monique.jpg" }) {
          ...processMemberImage
        }
      }
    `}
    render={data => {
      const boardOneData = data.boardOne.childImageSharp.fixed;
      const boardTwoData = data.boardTwo.childImageSharp.fixed;
      const boardThreeData = data.boardThree.childImageSharp.fixed;
      return (
        <div className="about-container">
          <h2>{title}</h2>
          <div className="about-row">
            <CardTeamMember
              data={boardOneData}
              name="Sam Staley"
              title="Board Chair"
            />
            <CardTeamMember
              data={boardTwoData}
              name="Susan Leigh"
              title="Board Member"
            />
            <CardTeamMember
              data={boardThreeData}
              name="Monique Ellsworth"
              title="Board Member"
            />
            {/* <CardTeamMember name="Amanda Wander" title="Board Member" /> */}
          </div>
        </div>
      );
    }}
  />
);

export default Board;
