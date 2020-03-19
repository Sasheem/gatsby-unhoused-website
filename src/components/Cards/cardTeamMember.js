import React from 'react';
import Img from 'gatsby-image';

import './cards.scss';

const CardTeamMember = ({ data, name, title }) => {
  return (
    <div className="card-team-member">
      <div className="card-image-container">
        <Img
          className="card-img"
          fixed={data}
          alt={`${name}'s profile picture`}
        />
      </div>
      <p className="card-name">{name}</p>
      <p className="card-title">{title}</p>
    </div>
  );
};

export default CardTeamMember;
