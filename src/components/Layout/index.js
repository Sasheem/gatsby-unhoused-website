/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { FirebaseContext, useAuth } from '../Firebase';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

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

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }) => {
  const { user, firebase, loading } = useAuth();
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const stripePromise = loadStripe('pk_test_kfC9Tjzf7w4Ko5nUH8AycCMe');

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

  function backdropClickHandler() {
    setSideMenuIsOpen(false);
  }

  if (stripePromise) {
    console.log('stripe promise loaded');
  } else {
    console.log('stripe promises NOT loaded');
  }

  return (
    <FirebaseContext.Provider value={{ user, firebase, loading }}>
      <Elements stripe={stripePromise}>
        <Header
          siteTitle={data.site.siteMetadata.title}
          menuClickHandler={menuToggleClickHandler}
        />
        <SideMenu show={sideMenuIsOpen} />
        {sideMenuIsOpen === true ? (
          <Backdrop click={backdropClickHandler} />
        ) : null}
        <LayoutContainer>
          <main>{children}</main>
          <Footer />
        </LayoutContainer>
      </Elements>
    </FirebaseContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
