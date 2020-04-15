import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import CardCallToAction from '../Cards/cardCallToAction';

import '../../styles/global.scss';

const CallToActions = () => (
  <StaticQuery
    query={graphql`
      fragment processCallImage on File {
        childImageSharp {
          fluid(maxWidth: 325) {
            ...GatsbyImageSharpFluid
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
      const dataCallOne = data.callToActionOne.childImageSharp.fluid;
      const dataCallTwo = data.callToActionTwo.childImageSharp.fluid;
      const dataCallThree = data.callToActionThree.childImageSharp.fluid;
      return (
        <div className="container-three">
          <h2>Get Involved</h2>
          <div className="content-three">
            <CardCallToAction
              title="Recurring Donations"
              text="Sed nunc massa, sodales non dui quis, iaculis dapibus odio. 
				Pellentesque quam orci, vestibulum nec odio in, blandit volutpat enim."
              link="Sign Up"
              destination="/register"
              fluid={dataCallOne}
            />
            <CardCallToAction
              title="Success stories"
              text="In ac iaculis metus. Aenean ut aliquam ex. Maecenas viverra magna metus, porttitor sollicitudin dolor ultrices non."
              link="Read a story"
              destination="/stories"
              fluid={dataCallTwo}
            />
            <CardCallToAction
              title="Opportunities"
              text="Aliquam placerat ligula eu turpis posuere, quis volutpat dolor sagittis. Morbi vehicula pharetra gravida. 
				Nulla non eros diam. Fusce rutrum ligula justo, eu mattis justo hendrerit at."
              link="Join team"
              destination="/"
              fluid={dataCallThree}
            />
          </div>
        </div>
      );
    }}
  />
);

export default CallToActions;
