import React from 'react';
import Layout from '../components/Layout/layout';
import SEO from '../components/seo';

import '../styles/global.scss';

import BlogGrid from '../components/Blog/blogGrid';

const StoriesPage = props => {
  console.dir(props);
  return (
    <Layout>
      <SEO title="Stories" />
      <div className="blog-container">
        <h1>Welcome to our success stories page</h1>
        <BlogGrid clients={props.data.allPost.edges} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allPost {
      edges {
        node {
          firstName
          answers
          goal
          lastName
          questions
          raised
          situation
          status
          slug
        }
      }
    }
  }
`;

export default StoriesPage;
