import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';

import ProgressBar from '../ProgressBar/progressBar';
import './cards.scss';

const CardClientAdmin = ({ client }) => {
  const {
    firstName,
    lastName,
    raised,
    goal,
    imageUrl,
    status,
    dateHoused,
    dateFundingBegan,
  } = client;

  return (
    <div className="card-featured-container">
      <Link
        to={`/story/${firstName}-${lastName}`}
        state={{ raised, status, dateHoused }}
      >
        <div className="card-header">
          <img
            src={imageUrl}
            alt={`${firstName}'s card`}
            className="card-image"
          />
        </div>
      </Link>
      <div className="featured-info-container">
        <div className="featured-flex" />
        <div className="featured-content">
          <div className="featured-bio">
            <Link
              to={`/story/${firstName}-${lastName}`}
              state={{ raised, status, dateHoused }}
              className="card-featured-link"
            >
              <p>
                {firstName} {lastName}
              </p>
            </Link>
            {status === 'Housed' ? (
              <span className="m-top-lg">
                <p>
                  <strong>Housed:</strong>{' '}
                  {moment(dateHoused.toDate()).format('ll')}
                </p>
              </span>
            ) : (
              <span className="m-top-lg">
                <p>
                  <strong>Joined: </strong>
                  {moment(dateFundingBegan.toDate()).format('ll')}
                </p>
              </span>
            )}
          </div>
          <div className="featured-progress">
            <ProgressBar percentage={(raised / goal) * 100} />
          </div>
          <div className="featured-status">
            <div className="status">
              <p className="raised">${raised}</p>
              <p className="goal">raised of ${goal}</p>
            </div>
          </div>
        </div>
        <div className="featured-flex" />
      </div>
    </div>
  );
};

export default CardClientAdmin;
