import styled from 'styled-components';
import Img from 'gatsby-image';

export const AlternatingSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const AlternatingRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 5em 0;
  h3,
  p {
    text-align: center;
  }

  @media only screen and (min-width: 800px) {
    flex-direction: row;
    text-align: left;
    h3,
    p {
      text-align: left;
    }

    ${({ reverse }) =>
      reverse &&
      `
        flex-direction: row-reverse;
    `}
  }
`;
export const AlternatingImage = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 1em;
`;
export const AlternatingText = styled(AlternatingImage)``;
export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3,
  p {
    margin-bottom: 1em;
  }
`;
export const Image = styled(Img)`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 5px;
  object-fit: fill;
`;
export const Fill = styled.div`
  flex: 0.3;
`;
