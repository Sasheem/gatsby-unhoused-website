import React from 'react';
import styled from 'styled-components';

import Button from '../common/Button/button';
import CardMetric from '../Cards/cardMetric';

// styled components
const HeroDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  background: url('../../images/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;
const Fill = styled.div`
  flex: 0.5;
  background-color: yellow;
`;
const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: pink;
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
  <HeroDiv>
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
  </HeroDiv>
);

export default Hero;
