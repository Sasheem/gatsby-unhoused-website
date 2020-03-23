import React from 'react';

import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import Team from '../components/About/team';
import Partners from '../components/About/partners';
import Board from '../components/About/board';

import '../styles/global.scss';

const AboutPage = () => (
  <div className="page-body">
    <SEO title="About" />
    <Hero
      title="About Unhoused Humanity"
      subtitle="We believe everyone deserves a roof over their head"
      label="Join our team"
      destination="/contactVolunteer"
    />
    <div className="page-content">
      <div className="content-container">
        <h2>We are on a mission to house those experiencing homelessness</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          imperdiet pharetra consectetur.
        </p>
      </div>
      <div className="clients-featured-content">
        <div className="content-card">
          <h3>Our misson</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            imperdiet pharetra consectetur. Mauris vitae rhoncus ex, luctus
            lacinia eros.
          </p>
        </div>
        <div className="content-card">
          <h3>Our vision</h3>
          <p>
            Nunc sit amet faucibus sem. Aenean condimentum, sem id tincidunt
            ultricies, tortor ex sollicitudin tellus, sit amet porttitor mauris
            dui sit amet augue.
          </p>
        </div>
        <div className="content-card">
          <h3>Our values</h3>
          <p>
            Phasellus convallis enim vitae urna malesuada, vitae ultrices quam
            imperdiet. Nullam condimentum, nisl vel aliquam aliquam, erat augue
            malesuada justo, euismod sollicitudin tortor erat id lacus.
          </p>
        </div>
      </div>
      <div className="content-container">
        <Team title="Our Team" />
      </div>
      <div className="content-container">
        <h2>Our History</h2>
        <p>
          Maecenas placerat metus at elit cursus, vel ultricies magna molestie.
          Cras hendrerit dictum arcu, aliquet ultrices risus iaculis sed. Sed
          congue placerat nulla, quis vestibulum ipsum pellentesque ut.
          Curabitur dictum mauris urna, et dictum orci semper vel. Pellentesque
          tempus dolor non augue bibendum, non aliquet tortor auctor. In
          vehicula odio sed molestie placerat. Donec ante libero, vehicula sit
          amet elementum a, pretium at massa. Suspendisse augue ligula, eleifend
          a ligula ac, commodo feugiat tortor. Vestibulum varius vestibulum
          luctus. Aliquam pharetra consequat quam. Nulla tellus nisi, fringilla
          sit amet erat eget, sollicitudin iaculis diam.scelerisque.
        </p>
      </div>
      <div className="content-container">
        <Board title="Our Board" />
      </div>
      <div className="content-container">
        <Partners title="Partners and Sponsors" />
      </div>
    </div>
  </div>
);

export default AboutPage;
