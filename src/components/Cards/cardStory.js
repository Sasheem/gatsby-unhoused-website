import React from 'react';
import { Link } from 'gatsby';

import BlogDate from '../Blog/blogDate';

import './cards.scss';

const CardStory = ({
  firstName,
  lastName,
  description,
  date,
  status,
  time,
  imageUrl,
  raised,
}) => {
  return (
    <Link to={`/story/${firstName}-${lastName}`}>
      <div className="card-featured-container">
        <div className="card-header">
          <img
            src={imageUrl}
            className="card-image"
            alt={`${firstName} profile`}
          />
        </div>
        <div className="featured-info-container">
          <div className="featured-flex" />
          <div className="featured-content">
            <div className="featured-bio">
              <h3>Meet {firstName}</h3>
              <p className="situation">{description}</p>
            </div>
            <div className="card-footer">
              <div className="footer-left">
                <h5>{status === 'Housed' ? 'Fully Funded' : 'Raised'}</h5>
                <p className="raised">${raised}</p>
              </div>
              <div className="footer-right">
                <h5>{status === 'Housed' ? 'Housed on' : 'Funding began'}</h5>
                <p className="goal">{date}</p>
              </div>
            </div>
          </div>
          <div className="featured-flex" />
        </div>
      </div>
    </Link>
  );
};

export default CardStory;
