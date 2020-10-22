import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';

import FooterNewsletter from './footerNewsletter';

import './footer.scss';

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        footerLogo: file(relativePath: { eq: "logo-light.png" }) {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => {
      const dataLogo = data.footerLogo.childImageSharp.fixed;
      return (
        <footer className="footer">
          <div className="elements-container">
            <div className="footer-left-element">
              <div className="footer-element newsletter-text-footer">
                <h3>Join Newsletter</h3>
                <p>
                  Receive updates on new clients, blog posts, and success
                  stories.
                </p>
                <FooterNewsletter />
              </div>
              <div className="footer-element">
                <Link to="/">
                  <Img fixed={dataLogo} alt="Unhoused Humanity light logo" />
                </Link>
              </div>
            </div>
            <div className="footer-right-element">
              <div className="footer-navbar-items">
                <h3>Navigate</h3>
                <ul>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/crowdfund">Crowdfunding</Link>
                  </li>
                  <li>
                    <Link to="/stories">Stories</Link>
                  </li>
                  <li>
                    <Link to="/faqs">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/resources">Resources</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-navbar-items">
                <h3>Get Involved</h3>
                <ul>
                  <li>
                    <Link to="/contactHelp">Request Help</Link>
                  </li>
                  <li>
                    <Link to="/contactVolunteer">Volunteer</Link>
                  </li>
                  <li>
                    <Link to="/contactDonate">Donation</Link>
                  </li>
                  <li>
                    <Link to="/contactCaseworker">Case Workers</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-navbar-items">
                <h3>Our Team</h3>
                <ul>
                  <li>
                    <Link to="/about">Founders</Link>
                  </li>
                  <li>
                    <Link to="/about">The Team</Link>
                  </li>
                  <li>
                    <Link to="/about">Board of Directors</Link>
                  </li>
                  <li>
                    <Link to="/about">Partners</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sub-footer">
            <p>
              © {new Date().getFullYear()}, Built by
              <a href="https://www.sasheem.dev"> SasheemDev</a>
            </p>
          </div>
        </footer>
      );
    }}
  />
);
export default Footer;
