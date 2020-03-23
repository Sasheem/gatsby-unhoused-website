import React from 'react';

import EmailIcon from '../../assets/envelope-solid.svg';
import TwitterIcon from '../../assets/twitter-brands.svg';
import FacebookIcon from '../../assets/facebook-brands.svg';
import SMSIcon from '../../assets/sms-solid.svg';

import './story.scss';

const StoryIcons = () => {
  return (
    <div className="story-social-icons">
      <div className="icon-container">
        <FacebookIcon />
      </div>
      <div className="icon-container">
        <TwitterIcon />
      </div>
      <div className="icon-container">
        <EmailIcon />
      </div>
      <div className="icon-container">
        <SMSIcon />
      </div>
    </div>
  );
};

export default StoryIcons;
