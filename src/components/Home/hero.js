import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';

import Button from '../common/Button/button';

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
    max-width: 90%;
    line-height: 1.625;
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

const Hero = ({ title, subtitle, label, destination, location }) => {
  return (
    <StaticQuery
      query={graphql`
        fragment processHeroBanner on File {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        query {
          bannerHome: file(relativePath: { eq: "banner-home.jpg" }) {
            ...processHeroBanner
          }
          bannerAbout: file(relativePath: { eq: "banner-about.jpg" }) {
            ...processHeroBanner
          }
          bannerCrowdfund: file(relativePath: { eq: "banner-crowdfund.jpg" }) {
            ...processHeroBanner
          }
        }
      `}
      render={data => {
        const bannerHome = data.bannerHome.childImageSharp.fluid;
        const bannerAbout = data.bannerAbout.childImageSharp.fluid;
        const bannerCrowdfund = data.bannerCrowdfund.childImageSharp.fluid;
        let bannerToShow = null;

        if (location === 'About') {
          bannerToShow = bannerAbout;
        } else if (location === 'Crowdfund') {
          bannerToShow = bannerCrowdfund;
        }

        return (
          <StyledHero
            Tag="div"
            fluid={bannerToShow === null ? bannerHome : bannerToShow}
          >
            <Fill />
            <Content>
              <h1>{title}</h1>
              <p>{subtitle}</p>
              <Button label={label} destination={destination} />
            </Content>
          </StyledHero>
        );
      }}
    />
  );
};

export default Hero;
