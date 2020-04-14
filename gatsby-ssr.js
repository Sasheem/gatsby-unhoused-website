/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// Backend
import React from 'react';
import Layout from './src/components/Layout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

/**
 * @param {*element} - represents the children
 * @param {*props}
 * * wrapPageElement hook is specific to gatsby
 *
 * * copying from gatsby-browser because it syncs up what is rendered
 * * in browser with the server
 */

const stripePromise = loadStripe('pk_test_kfC9Tjzf7w4Ko5nUH8AycCMe');

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      <Elements stripe={stripePromise}>{element}</Elements>
    </Layout>
  );
};
