import styled from 'styled-components';

import '../../styles/global.scss';

export const Input = styled.input`
  display: block;
  width: 95%;
  padding: 0.2em;
  margin-bottom: 1em;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: none;
  font-size: 1.1em;

  &:focus,
  &:active {
    /* border: 1px solid $main-accent-color; */
  }
`;
