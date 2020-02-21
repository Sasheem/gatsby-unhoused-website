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
}) => {
  return (
    <Link to={`/story/${firstName}-${lastName}`}>
      <div className="card-container">
        <div className="card-header">
          <img
            src={imageUrl}
            className="card-image"
            alt={`${firstName} profile`}
          />
        </div>
        <div className="card-body">
          <h4>Meet {firstName}</h4>
          <p>{description}</p>
        </div>
        <div className="card-footer">
          <p>{date}</p>
          <p>|</p>
          <p>{status}</p>
          <p>|</p>
          <p>{time}</p>
          {/* <div className="footer-left ">
            <BlogDate date={date} />
            <p>02-10-20</p>
            <p>|</p>
            <p>{status}</p>
          </div>
          <div className="footer-right">
            <p>{time}</p>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default CardStory;