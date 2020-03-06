import styled from 'styled-components';

import '../../styles/global.scss';

export const Button = styled.button`
  padding: 0.8em 1.6em;
  background: #299ecc;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  border: none;

  /* forces text not to wrap */
  white-space: nowrap;

  /* Add this css if block prop exists */
  ${props => (props.block ? 'display: block; width: 102%;' : '')}
  ${props => (props.submit ? 'font-size: 1.1em;' : '')}

  &:hover {
    background: #4db3db;
  }
`;
