import styled from 'styled-components';
import { Link } from 'gatsby';

export const ButtonLink = styled(Link)`
  padding: 0.8em 1.6em;
  background: #299ecc;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  text-align: center;

  /* forces text not to wrap */
  white-space: nowrap;

  /* Add this css if block prop exists */
  ${props => (props.block ? 'display: block; width: 102%;' : '')}

  &:hover {
    background: #4db3db;
  }
`;
