import React from 'react';

import './progressBar.scss';

const ProgressBar = props => (
  <div className="progress-bar">
    <div className="filler" style={{ width: `${props.percentage}%` }} />
  </div>
);

export default ProgressBar;
