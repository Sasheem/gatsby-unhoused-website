import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';

import CardCallToAction from '../Cards/cardCallToAction';

const ActionsDiv = styled.div`
  max-width: 1120px;
  width: 100%;

  h2 {
    text-align: center;
  }
`;
const ActionsContent = styled.div`
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

const CallToActions = () => (
  <StaticQuery
    query={graphql`
      fragment processCallImage on File {
        childImageSharp {
          fixed(width: 325) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      query {
        callToActionOne: file(relativePath: { eq: "callToActionOne.jpg" }) {
          ...processCallImage
        }
        callToActionTwo: file(relativePath: { eq: "callToActionTwo.jpg" }) {
          ...processCallImage
        }
        callToActionThree: file(relativePath: { eq: "callToActionThree.jpg" }) {
          ...processCallImage
        }
      }
    `}
    render={data => {
      const dataCallOne = data.callToActionOne.childImageSharp.fixed;
      const dataCallTwo = data.callToActionTwo.childImageSharp.fixed;
      const dataCallThree = data.callToActionThree.childImageSharp.fixed;
      return (
        <ActionsDiv>
          <h2>Get Involved</h2>
          <ActionsContent>
            <CardCallToAction
              title="Recurring Donations"
              text="Sed nunc massa, sodales non dui quis, iaculis dapibus odio. 
				Pellentesque quam orci, vestibulum nec odio in, blandit volutpat enim."
              link="Sign Up"
              destination="/register"
              fixed={dataCallOne}
            />
            <CardCallToAction
              title="Success stories"
              text="In ac iaculis metus. Aenean ut aliquam ex. Maecenas viverra magna metus, porttitor sollicitudin dolor ultrices non."
              link="Read a story"
              destination="/stories"
              fixed={dataCallTwo}
            />
            <CardCallToAction
              title="Opportunities"
              text="Aliquam placerat ligula eu turpis posuere, quis volutpat dolor sagittis. Morbi vehicula pharetra gravida. 
				Nulla non eros diam. Fusce rutrum ligula justo, eu mattis justo hendrerit at."
              link="Join team"
              destination="/"
              fixed={dataCallThree}
            />
          </ActionsContent>
        </ActionsDiv>
      );
    }}
  />
);

export default CallToActions;
