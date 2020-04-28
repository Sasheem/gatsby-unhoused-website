import React, { useState, useContext, useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';

import { FirebaseContext } from '../Firebase';
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
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [metrics, setMetrics] = useState(null);
  const [partners, setPartners] = useState(0);

  useEffect(() => {
    let partnerCount = 0;
    if (firebase) {
      // get partner count
      firebase
        .getPartners()
        .then(snapshot => {
          snapshot.forEach(doc => (partnerCount += 1));
          setPartners(partnerCount);
        })
        .catch(error => {
          console.log(`error getting partners: ${error.message}`);
        });

      // get clients metrics
      firebase
        .getClientsMetrics()
        .then(snapshot => {
          setMetrics(snapshot.data());
        })
        .catch(error => {
          console.log(`error getting metrics: ${error.message}`);
        });
    }
  }, [firebase]);

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
          <StyledHero Tag="div" fluid={bannerData}>
            <Fill />
            <Content>
              <h1>{title}</h1>
              <p>{subtitle}</p>
              <Button label={label} destination={destination} />
            </Content>
            <Metrics>
              <CardMetric name="Partners" value={partners} />
              {metrics !== null && (
                <CardMetric name="Clients Housed" value={metrics.housed} />
              )}
              {metrics !== null && (
                <CardMetric
                  name="Still Housed"
                  value={`${((metrics.housed / metrics.total) * 100).toFixed(
                    0
                  )}%`}
                />
              )}
            </Metrics>
          </StyledHero>
        );
      }}
    />
  );
};

export default Hero;
