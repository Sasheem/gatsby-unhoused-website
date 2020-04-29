import React from 'react';

import './button.scss';

const ButtonSubmit = ({ value, disabled }) => (
  <input className="button" type="submit" value={value} disabled={disabled} />
);

export default ButtonSubmit;
