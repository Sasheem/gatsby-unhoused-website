/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Backend
import React from 'react';
import Layout from './src/components/Layout';

/**
 * @param {*element} - represents the children
 * @param {*props}
 * * wrapPageElement hook is specific to gatsby
 */

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
