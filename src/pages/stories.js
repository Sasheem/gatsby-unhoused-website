import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';

import '../styles/global.scss';

import BlogGrid from '../components/Blog/blogGrid';

const StoriesPage = props => {
  console.dir(props);
  return (
    <section>
      <SEO title="Stories" />
      <div className="blog-container">
        <h1>Unhoused Humanity Success Stories</h1>
        <BlogGrid clients={props.data.allPost.edges} />
      </div>
    </section>
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
          imageUrl
          dateHoused
        }
      }
    }
  }
`;

export default StoriesPage;
