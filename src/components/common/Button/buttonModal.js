import React from 'react';

import './button.scss';

const ButtonModal = ({ actionClick, children }) => {
  return (
    <div className="button" onClick={actionClick}>
      {children}
    </div>
  );
};

export default ButtonModal;
