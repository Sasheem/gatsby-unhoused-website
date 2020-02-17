import React from 'react';

import ButtonDonate from '../common/Button/buttonDonate';
import ProgressBar from '../ProgressBar/progressBar';

import './cards.scss';

const CardClientFeatured = ({ name, situation, raised, goal, imageUrl }) => (
  <div className="card-featured-container">
    <div className="card-header">
      <img src={imageUrl} alt={`${name} card`} className="card-image" />
    </div>
    <div className="featured-info-container">
      <div className="featured-flex" />
      <div className="featured-content">
        <h4>Meet {name}</h4>
        <p>{situation}</p>
        <div className="featured-progress">
          <ProgressBar percentage={(raised / goal) * 100} />
        </div>
        <div className="featured-status">
          <span>
            <p>${raised}</p>
            <p>raised of ${goal}</p>
          </span>
          <ButtonDonate label="Donate" destination="/" />
        </div>
      </div>
      <div className="featured-flex" />
    </div>
  </div>
);

export default CardClientFeatured;
