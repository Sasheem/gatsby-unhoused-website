import React, { useContext, useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

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

  const data = useStaticQuery(graphql`
    query {
      missionImage: file(relativePath: { eq: "mission-image.png" }) {
        base
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      visionImage: file(relativePath: { eq: "vision-image.png" }) {
        base
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

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
      <SEO
        title="About Unhoused Humanity"
        description="We are a small group of professionals working to help those experiencing homelessness and to spread awareness in Tallahassee, Florida."
      />
      <Hero
        title="About Us"
        subtitle="We believe everyone deserves a roof over their head"
        label="Join our team"
        destination="/contactVolunteer"
        location="About"
      />
      <Metrics />
      <div className="page-content-container">
        <div />
        <div className="page-content">
          <div className="content-container-grid-two">
            <div className="content-element-three">
              <h2>Our Mission</h2>
              <Img
                className="steps-img"
                fluid={data.visionImage.childImageSharp.fluid}
                alt={data.visionImage.base.split('.')[0]}
              />
            </div>
            <div className="content-element-three">
              <p>
                We are on a mission to provide a fresh start to the homeless
                community while chipping away at the barrier that separates them
                from society
              </p>
              <p>
                As we drive on the way to school or work, we try not to make eye
                contact with those who have fallen and have been forgotten. We
                either look forward, or ignore their presence. We pretend not to
                notice them and acknowledge their existence.
              </p>
              <p>
                This is something we hear time and time again. Surprisingly the
                worst part about being homeless is the feeling of not being
                apart of society. getting ignored by everyone, because they are
                stereotyping you.
              </p>
            </div>
          </div>
          <div className="content-container">
            <Team title="Our Team" />
          </div>
          <div className="content-container-grid-two">
            <div className="content-element-three">
              <p>
                Unhoused Humanity was founded for one reason; to fill the
                growing gap of initial expense required to get housed.
              </p>
              <p>
                A great deal of individuals who are experiencing homelessness
                have an income, but don't have the necessary amount of capital
                to enter a home. There are others who experience life
                difficulties such as high medical bills, and electricity bills,
                which causes them to run short on their monthly budget.
              </p>
              <p>
                At Unhoused Humanity we strongly believe that individuals who
                are experiencing these situations should never be homeless, or
                experience long- term homelessness. That is why our grant
                program provides those start-up cost for people who need the
                extra help back up.
              </p>
            </div>
            <div className="content-element-three">
              <h2>Our Vision</h2>
              <Img
                className="steps-img"
                fluid={data.missionImage.childImageSharp.fluid}
                alt={data.missionImage.base.split('.')[0]}
              />
            </div>
          </div>
          {/* <div className="content-grid-one">
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
          </div> */}
          {/* <div className="content-three">
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
          </div> */}

          {/* <div className="content-grid-one">
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
          </div> */}
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
