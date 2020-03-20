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
      }
    `}
    render={data => {
      const boardOneData = data.boardOne.childImageSharp.fixed;
      return (
        <div className="about-container">
          <h2>{title}</h2>
          <div className="about-row">
            <CardTeamMember
              data={boardOneData}
              name="Sam"
              title="Board Member"
            />
            <div className="about-card-fill" />
            <div className="about-card-fill" />
            <div className="about-card-fill" />
          </div>
        </div>
      );
    }}
  />
);

export default Board;
