import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import ButtonDonate from '../common/Button/buttonDonate';
import ProgressBar from '../ProgressBar/progressBar';

import './cards.scss';

/**
 * todo change button to a link
 * * include firstName and lastName in the state object
 */

const CardClientFeatured = ({ client }) => {
  const { firstName, lastName, situation, raised, goal, imageUrl } = client;
  return (
    <Link to={`/story/${firstName}-${lastName}`} state={{ client }}>
      <div className="card-featured-container">
        <div className="card-header">
          <img
            src={imageUrl}
            alt={`${firstName}'s card`}
            className="card-image"
          />
        </div>
        <div className="featured-info-container">
          <div className="featured-flex" />
          <div className="featured-content">
            <div className="featured-bio">
              <h3>Meet {firstName}</h3>
              <h4>Situation</h4>
              <p className="situation">{`${situation.slice(0, 90)}...`}</p>
            </div>
            <div className="featured-progress">
              <ProgressBar percentage={(raised / goal) * 100} />
            </div>
            <div className="featured-status">
              <div className="status">
                <p className="raised">${raised}</p>
                <p className="goal">raised of ${goal}</p>
              </div>
              <ButtonDonate label="Donate" destination="/" />
            </div>
          </div>
          <div className="featured-flex" />
        </div>
      </div>
    </Link>
  );
};

export default CardClientFeatured;
