/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
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
 */
const stripePromise = loadStripe('pk_test_kfC9Tjzf7w4Ko5nUH8AycCMe');

export const wrapRootElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      <Elements stripe={stripePromise}>{element}</Elements>
    </Layout>
  );
};
