import React from 'react';

import CardCallToActionCrowdfund from '../Cards/cardCallToActionCrowdfund';
import DonateIcon from '../../assets/donate-solid.svg';
import VolunteerIcon from '../../assets/hands-helping-solid.svg';
import SignupIcon from '../../assets/sign-in-alt-solid.svg';

import '../../styles/global.scss';

const CallToActions = () => (
  <div className="container-three">
    <h2>Crowdfund Call to Actions</h2>
    <div className="content-three">
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
    </div>
  </div>
);

export default CallToActions;
