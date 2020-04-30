import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import BlogDate from '../Blog/blogDate';

import './cards.scss';

const CardStory = ({ key, client }) => {
  const {
    firstName,
    lastName,
    situation,
    status,
    imageUrl,
    raised,
    dateHoused,
    dateFundingBegan,
  } = client;
  const date = client.status === 'Unhoused' ? dateHoused : dateFundingBegan;
  return (
    <Link
      to={`/story/${firstName}-${lastName}`}
      state={{ raised, status, dateHoused }}
    >
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
              <p className="situation">{`${situation.slice(0, 90)}...`}</p>
            </div>
            <div className="card-footer">
              <div className="footer-left">
                <h5>{status === 'Housed' ? 'Fully Funded' : 'Raised'}</h5>
                <p className="raised">${raised}</p>
              </div>
              <div className="footer-right">
                <h5>{status === 'Housed' ? 'Housed on' : 'Funding began'}</h5>
                <p className="goal">{moment(date.toDate()).format('l')}</p>
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
