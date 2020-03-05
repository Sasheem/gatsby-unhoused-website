/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { FirebaseContext, useAuth } from '../Firebase';

import Header from '../Header/header';
import Footer from '../Footer/footer';

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }) => {
  const { user, firebase, loading } = useAuth();

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <FirebaseContext.Provider value={{ user, firebase, loading }}>
      <Header siteTitle={data.site.siteMetadata.title} />
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
