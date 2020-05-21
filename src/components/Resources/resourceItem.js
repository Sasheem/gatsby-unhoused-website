import React from 'react';
import { Link } from 'gatsby';

import LocationIcon from '../../assets/location-arrow-solid-grey.svg';
import PhoneIcon from '../../assets/phone-solid-grey.svg';

import './resources.scss';

const ResourceItem = ({
  title,
  webLink,
  address,
  phone,
  addressLink,
  phoneLink,
}) => {
  return (
    <div className="resource-item">
      <a href={webLink} target="_blank" className="resource-title">
        {title}
      </a>
      <div className="resource-row">
        <LocationIcon className="resource-icon" />
        <a href={addressLink} target="_blank" className="resource-detail">
          {address}
        </a>
      </div>
      <div className="resource-row">
        <PhoneIcon className="resource-icon" />
        <a href={phoneLink} className="resource-detail">
          {phone}
        </a>
      </div>
    </div>
  );
};

export default ResourceItem;
