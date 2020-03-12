import React from 'react';
import Img from 'gatsby-image';

import ButtonDonate from '../common/Button/buttonDonate';
import Button from '../common/button';
import { ButtonLink } from '../common';
import ProgressBar from '../ProgressBar/progressBar';

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
}) => (
  <div className="story-head">
    <h1>Meet {firstName}</h1>
    <div className="story-head-content">
      <div className="head-spacer-sm" />
      <div className="head-image-container">
        <Img fixed={imageUrl} className="story-head-image" />
      </div>
      <div className="head-spacer" />
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
            <p>Status</p>
            <p>{status}</p>
          </div>
          <div className="info-metric">
            <p>Family Size</p>
            <p>{familySize}</p>
          </div>
          <div className="info-metric">
            <p>{status === 'Housed' ? 'Date Housed' : 'Funding Began'}</p>
            <p>{status === 'Housed' ? dateHoused : dateFundingBegan}</p>
            {/* <PostDate date={date} /> */}
          </div>
        </div>
        <div className="info-column">
          <p>Share their story</p>
          <p>*place facebook, twitter, and email icons here*</p>
        </div>
        {status === 'Unhoused' ? (
          <div className="info-row">
            <ButtonLink block to="/">
              Donate
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </div>
  </div>
);

export default StoryHead;
