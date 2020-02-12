import React from 'react';

import Button from '../common/Button/button';
import CardMetric from '../Cards/cardMetric';

const Hero = ({ title, subtitle, label }) => (
  <div className="hero-container">
    <div className="hero-fill" />
    <div className="hero-content">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <Button label={label} destination="/story/Sheena-Salmon" />
    </div>
    <div className="hero-metrics">
      <CardMetric name="Partners" value="12" />
      <CardMetric name="Clients Housed" value="196" />
      <CardMetric name="Still Housed" value="85%" />
    </div>
  </div>
);

export default Hero;
