import React from 'react';

import ButtonDonateStory from '../common/Button/buttonDonateStory';
import ProgressBar from '../ProgressBar/progressBar';
import StoryIcons from '../Story/storyIcons';

import './story.scss';

const StoryHead = ({
  clientId,
  firstName,
  lastName,
  raised,
  goal,
  status,
  familySize,
  imageUrl,
  date,
}) => {
  const fullyFund = (goal - raised).toString();
  return (
    <div className="story-head">
      <h1>Meet {firstName}</h1>
      <div className="story-head-content">
        <div className="head-image-container">
          <img
            src={imageUrl}
            className="story-head-image"
            alt={`${firstName} story photo`}
          />
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
              <p>{date}</p>
            </div>
          </div>
          <div className="info-column">
            <h4>Share their story</h4>
            <StoryIcons
              url={`https://musing-joliot-870301.netlify.app/story/${firstName}-${lastName}`}
              fbHashtag="EndHomelessness"
              title={`${firstName} has been funded by Unhoused Humanity`}
              twHashtags={[
                'EndHomelessness',
                'UnhousedHumanity',
                'BreakingTheBarrier',
              ]}
              summary={`Unhoused Humanity has funded ${firstName} through generous donations from good people like you. Read their story today!`}
            />
          </div>
          {status === 'Funding' ? (
            <div className="info-row">
              <ButtonDonateStory
                label="Donate"
                destination="contactDonate"
                clientId={clientId}
                fullyFund={fullyFund}
              />
            </div>
          ) : null}
        </div>
        <div />
      </div>
    </div>
  );
};

export default StoryHead;
