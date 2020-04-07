import React from 'react';
import Img from 'gatsby-image';
import moment from 'moment';

import ButtonDonate from '../common/Button/buttonDonate';
import Button from '../common/button';
import { ButtonLink } from '../common';
import ProgressBar from '../ProgressBar/progressBar';
import StoryIcons from '../Story/storyIcons';

import './story.scss';

const StoryHead = ({
  firstName,
  raised,
  goal,
  status,
  familySize,
  imageUrl,
  dateFundingBegan,
  dateHoused,
}) => {
  const dateToShow = status === 'Housed' ? dateHoused : dateFundingBegan;
  return (
    <div className="story-head">
      <h1>Meet {firstName}</h1>
      <div className="story-head-content">
        <div />
        <div className="head-image-container">
          <div />
          <Img fixed={imageUrl} className="story-head-image" />
          <div />
        </div>
        <div className="head-info">
          <div className="info-column">
            <ProgressBar percentage={(raised / goal) * 100} />
            <div className="progress-bar-metrics">
              <p className="raised">${raised}</p>
              <p className="goal">raised of ${goal} goal</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info-metric">
              <h4>Status</h4>
              <p>{status}</p>
            </div>
            <div className="info-metric">
              <h4>Family Size</h4>
              <p>{familySize}</p>
            </div>
            <div className="info-metric">
              <h4>{status === 'Housed' ? 'Date Housed' : 'Funding Began'}</h4>
              <p>{moment(dateToShow).format('l')}</p>
            </div>
          </div>
          <div className="info-column">
            <h4>Share their story</h4>
            <StoryIcons />
          </div>
          {status === 'Unhoused' ? (
            <div className="info-row">
              <ButtonLink block to="/">
                Donate
              </ButtonLink>
            </div>
          ) : null}
        </div>
        <div />
      </div>
    </div>
  );
};

export default StoryHead;
