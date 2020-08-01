import React, { useContext, useState, useEffect } from 'react';

import { FirebaseContext } from '../components/Firebase';
import SEO from '../components/seo';
import Hero from '../components/Home/hero';
import Team from '../components/About/team';
import Partners from '../components/About/partners';
import Board from '../components/About/board';
import Metrics from '../components/common/Metrics/metrics';

import '../styles/global.scss';

const AboutPage = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (firebase) {
      const unsubscribe = firebase.subscribeToClientsMetrics({
        onSnapshot: snapshot => {
          console.log(`snapshot: ${typeof snapshot}`);
          console.dir(snapshot.data());
          setMetrics(snapshot.data());
        },
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [firebase]);
  const housedBuffer = metrics ? metrics.housed + 52 : 0;
  return (
    <div className="page-body">
      <SEO title="About" />
      <Hero
        title="About Unhoused Humanity"
        subtitle="We believe everyone deserves a roof over their head"
        label="Join our team"
        destination="/contactVolunteer"
        location="About"
      />
      <Metrics />
      <div className="page-content-container">
        <div />
        <div className="page-content">
          <div className="content-grid-one">
            <div />
            <div className="content-container">
              <h2>Who We Are</h2>
              <p>
                Unhoused Humanity is a non-profit, 501(c)3 charitable
                organization founded by students from Florida State University
                who are on a mission to diminish the boundaries that divide
                those who are homeless from the rest of society. Since its
                founding in 2015, Unhoused Humanity has placed {housedBuffer}{' '}
                people experiencing homelessness into permanent housing in the
                Tallahassee and surrounding areas.
              </p>
            </div>
            <div />
          </div>
          <div className="content-three">
            <div className="content-card">
              <h4>Our misson</h4>
              <p>
                To provide a fresh start to people experiencing homelessness
                while chipping away the barrier separating them from society.
              </p>
            </div>
            <div className="content-card">
              <h4>Our vision</h4>
              <p>
                To house every self sustaining eligible homeless individual in
                Tallahassee, Florida. We want to serve as a model non-profit
                organization that encourages others across the globe to utilize
                this very method in an effort to reduce homelessness.
              </p>
            </div>
            <div className="content-card">
              <h4>Our values</h4>
              <p>
                To achieve our initiative, we strive to contribute to society in
                a manner that is ethical, honest, and transparent. Our hearts
                lie within the communities that we serve, which is why we
                dedicate ourselves to long-term growth both economically and
                environmentally.
              </p>
            </div>
          </div>
          <div className="content-container">
            <Team title="Our Team" />
          </div>

          <div className="content-grid-one">
            <div />
            <div className="content-container">
              <h2>Our Goals</h2>
              <p>
                Many people experiencing homelessness have a steady source of
                income to maintain themselves once they are in a home but cannot
                save up enough money to put down for their first/last month’s
                rent or their utility payments. Unhoused Humanity aims to house
                every self sustaining eligible homeless individual in
                Tallahassee, Florida. We want to serve as a model non-profit
                organization that encourages others across the globe to utilize
                this very method in an effort to reduce homelessness.
              </p>
            </div>
            <div />
          </div>
          <div className="content-container">
            <Board title="Our Board" />
          </div>
          <div className="content-container">
            <Partners title="Partners and Sponsors" />
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
