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
  align-items: center;

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
  flex: 0.7;
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

  @media only screen and (max-width: 800px) {
    flex: 1.5;
  }
`;

const StyledHero = styled(BackgroundImage)`
  height: 50em;
  width: 100vw;
  background-color: transparent;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only scree and (max-width: 800px) {
    height: 42em;
  }
`;

const Hero = ({ title, subtitle, label, destination }) => {
  return (
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
          <StyledHero
            Tag="div"
            fluid={bannerData}
            // style={{
            //   height: `50em`,
            //   width: `100vw`,
            //   backgroundColor: `transparent`,
            //   backgroundSize: `cover`,
            //   backgroundPosition: `center center`,
            //   display: `flex`,
            //   flexDirection: `column`,
            //   alignItems: `center`,
            // }}
          >
            <Fill />
            <Content>
              <h1>{title}</h1>
              <p>{subtitle}</p>
              <Button label={label} destination={destination} />
            </Content>
            <Metrics>
              <CardMetric name="Partners" value="12" />
              <CardMetric name="Clients Housed" value="196" />
              <CardMetric name="Still Housed" value="85%" />
            </Metrics>
          </StyledHero>
        );
      }}
    />
  );
};

export default Hero;
