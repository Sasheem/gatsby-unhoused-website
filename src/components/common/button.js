import styled from 'styled-components';

import '../../styles/global.scss';

export const Button = styled.button`
  padding: 0.8em 1.6em;
  background: $main-accent-color;
  color: $color-light;
  border-radius: 4px;
  cursor: pointer;

  /* forces text not to wrap */
  white-space: nowrap;

  /* Add this css if block prop exists */
  ${props => (props.block ? 'display: block; width: 102%;' : '')}

  &:hover {
    background: $mono-accent-color;
  }
`;
