import styled from 'styled-components';

export const PageContent = styled.div`
  display: grid;
  grid-gap: 15em;
  justify-items: center;
`;

export const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  h2,
  p {
    text-align: center;
    margin-bottom: 1em;
  }
`;

export const ClientsFeatured = styled.div`
  max-width: 1120px;
  width: 100%;

  h2 {
    text-align: center;
    margin-bottom: 2em;
  }
`;

export const ClientsContent = styled.div`
  display: grid;
  grid-gap: 4em;
  justify-items: center;

  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
