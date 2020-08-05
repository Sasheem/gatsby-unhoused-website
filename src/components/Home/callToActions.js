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
        <div className="content-three">
          <CardCallToAction
            title="Homeless Resources"
            text="Are you about to experience homelessness? See our resources to find help."
            link="Resources"
            destination="/resources"
            fluid={dataCallOne}
          />
          <CardCallToAction
            title="Success stories"
            text="Read about recently housed clients and learn about their journey from homelessness."
            link="Read a story"
            destination="/stories"
            fluid={dataCallTwo}
          />
          <CardCallToAction
            title="Opportunities"
            text="We are looking for passionate volunteers ready to make an impact against homelessness."
            link="Join team"
            destination="/contactVolunteer"
            fluid={dataCallThree}
          />
        </div>
      );
    }}
  />
);

export default CallToActions;
