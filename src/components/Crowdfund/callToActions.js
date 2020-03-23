import React from 'react';
import styled from 'styled-components';

import CardCallToActionCrowdfund from '../Cards/cardCallToActionCrowdfund';
import DonateIcon from '../../assets/donate-solid.svg';
import VolunteerIcon from '../../assets/hands-helping-solid.svg';
import SignupIcon from '../../assets/sign-in-alt-solid.svg';

const ActionsDiv = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  h2 {
    margin-bottom: 2.5em;
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
  <ActionsDiv>
    <h2>Crowdfund Call to Actions</h2>
    <ActionsContent>
      <CardCallToActionCrowdfund
        text="Sed nunc massa, sodales non dui quis, iaculis dapibus odio. 
				Pellentesque quam orci, vestibulum nec odio in, blandit volutpat enim."
        link="Donate"
        destination="/contactDonate"
      >
        <DonateIcon />
      </CardCallToActionCrowdfund>
      <CardCallToActionCrowdfund
        text="In ac iaculis metus. Aenean ut aliquam ex. Maecenas viverra magna metus, porttitor sollicitudin dolor ultrices non."
        link="Volunteer"
        destination="/contactVolunteer"
      >
        <VolunteerIcon />
      </CardCallToActionCrowdfund>
      <CardCallToActionCrowdfund
        text="Aliquam placerat ligula eu turpis posuere, quis volutpat dolor sagittis. Morbi vehicula pharetra gravida. 
				Nulla non eros diam. Fusce rutrum ligula justo, eu mattis justo hendrerit at."
        link="Sign up"
        destination="/register"
      >
        <SignupIcon />
      </CardCallToActionCrowdfund>
    </ActionsContent>
  </ActionsDiv>
);

export default CallToActions;
