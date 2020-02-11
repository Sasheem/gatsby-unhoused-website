import React from 'react';

import ButtonDonate from '../common/Button/buttonDonate';
import ProgressBar from '../ProgressBar/progressBar';

import './story.scss';

const StoryHead = ({ firstName, raised, goal, status, familySize }) => (
  <section className="story-head">
    <h1>Meet {firstName}</h1>
    <div className="story-head-content">
      <div className="head-image-container">
        {/* <img
          className="story-head-image"
          src={`/images/clients/${image}.jpg`}
        /> */}
      </div>
      <div className="head-spacer" />
      <div className="head-info">
        <div className="info-column">
          <ProgressBar percentage={(raised / goal) * 100} />
          <div className="progress-bar-metrics">
            <p>${raised}</p>
            <p>raised of ${goal} goal</p>
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
            <p>Funding Began</p>
            {/* <PostDate date={date} /> */}
          </div>
        </div>
        <div className="info-column">
          <p>Share their story</p>
          <p>*place facebook, twitter, and email icons here*</p>
        </div>
        {status === 'Unhoused' ? (
          <div className="info-row">
            <ButtonDonate label="Donate" destination="/" />
          </div>
        ) : null}
      </div>
    </div>
  </section>
);

export default StoryHead;
