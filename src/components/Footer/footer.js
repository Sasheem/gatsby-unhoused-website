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
              <div className="footer-element newsletter-text">
                <h3>Join Newsletter</h3>
                <p>
                  Receive updates on blog posts, events and recently housed
                  clients
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
                    <Link to="/about">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/crowdfund">
                      <a>Crowdfunding</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/stories">
                      <a>Stories</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <a>FAQs</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-navbar-items">
                <h3>Get Involved</h3>
                <ul>
                  <li>
                    <Link to="/">
                      <a>Request Help</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <a>Volunteer</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <a>One-Time Donation</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <a>Recurring Donation</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <a>Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-navbar-items">
                <h3>Our Team</h3>
                <ul>
                  <li>
                    <Link to="/about">
                      <a>Founders</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <a>Board of Directors</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <a>The Team</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <a>Partners</a>
                    </Link>
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
