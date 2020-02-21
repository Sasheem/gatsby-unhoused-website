/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Backend
const React = require('react');
const Layout = require('./src/components/Layout/layout').default;

/**
 * @param {*element} - represents the children
 * @param {*props}
 * * wrapPageElement hook is specific to gatsby
 */

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
