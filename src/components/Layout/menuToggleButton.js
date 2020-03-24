import React from 'react';

import './styles.scss';

const MenuToggleButton = ({ click }) => (
  <button className="toggle-button" onClick={click}>
    <div className="toggle-button-line" />
    <div className="toggle-button-line" />
    <div className="toggle-button-line" />
  </button>
);

export default MenuToggleButton;
