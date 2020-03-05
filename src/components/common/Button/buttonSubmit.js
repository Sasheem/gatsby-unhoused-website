import React from 'react';

import './button.scss';

const ButtonSubmit = ({ value }) => (
  <input className="button" type="submit" value={value} />
);

export default ButtonSubmit;
