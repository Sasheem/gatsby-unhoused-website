import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';

import ButtonDonate from '../common/Button/buttonDonate';
import ProgressBar from '../ProgressBar/progressBar';

import './cards.scss';

/**
 * todo change button to a link
 * * include firstName and lastName in the state object
 */

const CardClientFeatured = ({ client }) => {
  const {
    firstName,
    lastName,
    situation,
    raised,
    goal,
    imageUrl,
    status,
    dateHoused,
    dateFundingBegan,
  } = client;
  const fullyFund = (goal - raised).toString();
  const date = status === 'Housed' ? dateHoused : dateFundingBegan;
  return (
    <div className="card-featured-container">
      <Link
        to={`/story/${firstName}-${lastName}`}
        state={{ raised, status, date: moment(date.toDate()).format('l') }}
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
              <h4>Meet {firstName}</h4>
            </Link>
            <span>
              <p className="situation">{`${situation.slice(0, 90)}...`}</p>
            </span>
          </div>
          <div className="featured-progress">
            <ProgressBar percentage={(raised / goal) * 100} />
          </div>
          <div className="featured-status">
            <div className="status">
              <p className="raised">${raised}</p>
              <p className="goal">raised of ${goal}</p>
            </div>
            <ButtonDonate
              label="Donate"
              destination="contactDonate"
              clientId={`${firstName}-${lastName}`}
              fullyFund={fullyFund}
            />
          </div>
        </div>
        <div className="featured-flex" />
      </div>
    </div>
  );
};

export default CardClientFeatured;
