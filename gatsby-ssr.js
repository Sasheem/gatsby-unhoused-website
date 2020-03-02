/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// Backend
import React from 'react';
import Layout from './src/components/Layout';

/**
 * @param {*element} - represents the children
 * @param {*props}
 * * wrapPageElement hook is specific to gatsby
 *
 * * copying from gatsby-browser because it syncs up what is rendered
 * * in browser with the server
 */

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
