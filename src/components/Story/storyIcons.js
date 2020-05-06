import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  EmailIcon,
  EmailShareButton,
} from 'react-share';

import './story.scss';

const StoryIcons = ({ url, title, summary, fbHashtag, twHashtags }) => {
  return (
    <div className="story-social-icons">
      <div className="icon-container">
        <FacebookShareButton url={url} quote={title} hashtag={fbHashtag}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
      </div>
      <div className="icon-container">
        <TwitterShareButton
          url={url}
          title={title}
          via="unhousedhumans"
          hashtags={twHashtags}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
      </div>
      <div className="icon-container">
        <LinkedinShareButton
          url={url}
          title={title}
          summary={summary}
          source="Unhoused Humanity"
        >
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>
      </div>
      <div className="icon-container">
        <EmailShareButton url={url} subject={title} body={summary}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default StoryIcons;
