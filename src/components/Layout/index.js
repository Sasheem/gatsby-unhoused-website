/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { FirebaseContext, useAuth } from '../Firebase';

import Header from '../Header/header';
import SideMenu from './sideMenu';
import Backdrop from './backdrop';
import Footer from '../Footer/footer';

/**
 * todo frontend: add close sideMenu & backdrop upon navigation from sideMenu link
 * todo frontend: fix the extra spacing to the right of website in mobile view
 * todo frontend: store stripe key as env variable
 * todo frotend: change api key from test to production
 */
import '../../styles/global.scss';

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }) => {
  const { user, firebase, loading } = useAuth();
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // handle menu toggled event
  // invert value of state
  function menuToggleClickHandler() {
    setSideMenuIsOpen(!sideMenuIsOpen);
  }

  function hideBackdrop() {
    setSideMenuIsOpen(false);
  }

  return (
    <FirebaseContext.Provider value={{ user, firebase, loading }}>
      <Header
        siteTitle={data.site.siteMetadata.title}
        menuClickHandler={menuToggleClickHandler}
        hideBackdrop={hideBackdrop}
      />
      <SideMenu show={sideMenuIsOpen} hideBackdrop={hideBackdrop} />
      {sideMenuIsOpen === true && <Backdrop click={hideBackdrop} />}
      <LayoutContainer>
        <main>{children}</main>
        <Footer />
      </LayoutContainer>
    </FirebaseContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
