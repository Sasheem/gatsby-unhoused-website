import React from 'react';
import Img from 'gatsby-image';
import { graphql, StaticQuery, Link } from 'gatsby';

import './header.scss';

const Logo = ({ hideBackdrop }) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo-dark.png" }) {
          childImageSharp {
            fixed(width: 220) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => {
      const dataLogo = data.logo.childImageSharp.fixed;
      return (
        <div className="navbar-logo">
          <Link to="/" onClick={hideBackdrop}>
            <Img fixed={dataLogo} alt="Unhoused Humanity logo dark" />
          </Link>
        </div>
      );
    }}
  />
);

export default Logo;
