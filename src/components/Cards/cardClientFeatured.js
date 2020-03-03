import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import ButtonDonate from '../common/Button/buttonDonate';
import ProgressBar from '../ProgressBar/progressBar';

import './cards.scss';

const CardClientFeatured = ({
  firstName,
  lastName,
  situation,
  raised,
  goal,
  imageUrl,
}) => {
  return (
    <Link to={`/story/${firstName}-${lastName}`}>
      <div className="card-featured-container">
        <div className="card-header">
          {/* <Img fixed={imageUrl} className="card-image" /> */}
          <img
            src={imageUrl}
            alt={`${firstName}'s card`}
            className="card-image"
          />
        </div>
        <div className="featured-info-container">
          <div className="featured-flex" />
          <div className="featured-content">
            <h4>Meet {firstName}</h4>
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
    </Link>
  );
};

export default CardClientFeatured;
