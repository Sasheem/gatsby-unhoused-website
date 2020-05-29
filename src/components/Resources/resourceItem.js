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
        <a href={addressLink} target="_blank" className="resource-detail">
          {address}
        </a>
        <a href={phoneLink} className="resource-detail">
          {phone}
        </a>
        {subtitleTwo && <h5>{subtitleTwo}</h5>}
        {email && (
          <a
            href="mailto:info@goodsamaritanchapel.org"
            target="_blank"
            className="resource-detail"
          >
            {email}
          </a>
        )}
        {addressTwo && addressLinkTwo && (
          <a href={addressLinkTwo} target="_blank" className="resource-detail">
            {addressTwo}
          </a>
        )}
        {phoneLink && phoneLinkTwo && (
          <a href={phoneLinkTwo} className="resource-detail">
            {phoneTwo}
          </a>
        )}
      </div>
    </div>
  );
};

export default ResourceItem;
