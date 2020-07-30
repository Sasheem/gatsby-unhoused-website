import React from 'react';

import CardStory from '../Cards/cardStory';

import './blog.scss';

/**
 *
 * @param {clients array} param0
 * @param {loading boolean} param1
 *
 * todo add a loading component
 */

const BlogGrid = ({ clients, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="blog-grid">
      {clients.map(client => (
        <CardStory
          key={`${client.firstName}-${client.lastName}`}
          client={client}
        />
      ))}
    </div>
  );
};

export default BlogGrid;
