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
const stripePromise = loadStripe('pk_test_LAvs2Fvcfl3PgL2TjKuFEeRk');

export const wrapPageElement = ({ element, props }) => {
  return (
    <Elements stripe={stripePromise}>
      <Layout {...props}>{element}</Layout>
    </Elements>
  );
};
