import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';

import Button from '../common/Button/button';
import CardMetric from '../Cards/cardMetric';

// styled components
const Fill = styled.div`
  flex: 1.5;
`;
const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;

  h1,
  p {
    text-align: center;
    color: white;
    margin: 0;
  }
  p {
    margin: 1em;
  }
`;

const Metrics = styled.div`
  flex: 0.5;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: black;

  @media only screen and (min-width: 800px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Hero = ({ title, subtitle, label }) => (
  <StaticQuery
    query={graphql`
      query {
        bannerImage: file(relativePath: { eq: "banner.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      const bannerData = data.bannerImage.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag="div"
          fluid={bannerData}
          style={{
            height: `86vh`,
            width: `100vw`,
            backgroundColor: `transparent`,
            backgroundSize: `cover`,
            backgroundPosition: `center center`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
          }}
        >
          <Fill />
          <Content>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <Button label={label} destination="/story/Sheena-Salmon" />
          </Content>
          <Metrics>
            <CardMetric name="Partners" value="12" />
            <CardMetric name="Clients Housed" value="196" />
            <CardMetric name="Still Housed" value="85%" />
          </Metrics>
        </BackgroundImage>
      );
    }}
  />
);

const StyledHero = styled(Hero)`
  /* width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover; */
`;

export default StyledHero;
