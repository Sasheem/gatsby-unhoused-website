import React from 'react';

import LocationIcon from '../../assets/location-arrow-solid-grey.svg';
import PhoneIcon from '../../assets/phone-solid-grey.svg';

import './resources.scss';

const ResourceItem = ({
  resource,
  title,
  description,
  webLink,
  address,
  addressTwo,
  phone,
  addressLink,
  addressLinkTwo,
  phoneLink,
  phoneLinkTwo,
  phoneTwo,
  subtitleOne,
  subtitleTwo,
  email,
}) => {
  return (
    <div>
      <span id={resource} className="resource-scroll-anchor" />
      <div className="resource-item">
        <a href={webLink} target="_blank" className="resource-title">
          {title}
        </a>
        <p>{description}</p>
        {subtitleOne && <h5>{subtitleOne}</h5>}
        <p>
          <a href={addressLink} target="_blank" className="resource-detail">
            {address}
          </a>
        </p>
        <p>
          <a href={phoneLink} className="resource-detail">
            {phone}
          </a>
        </p>
        {subtitleTwo && <h5>{subtitleTwo}</h5>}
        {email && (
          <p>
            <a
              href="mailto:info@goodsamaritanchapel.org"
              target="_blank"
              className="resource-detail"
            >
              {email}
            </a>
          </p>
        )}
        {addressTwo && addressLinkTwo && (
          <p>
            <a
              href={addressLinkTwo}
              target="_blank"
              className="resource-detail"
            >
              {addressTwo}
            </a>
          </p>
        )}
        {phoneLink && phoneLinkTwo && (
          <p>
            <a href={phoneLinkTwo} className="resource-detail">
              {phoneTwo}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default ResourceItem;
