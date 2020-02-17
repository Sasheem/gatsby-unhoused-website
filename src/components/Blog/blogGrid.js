import React from 'react';

import CardStory from '../Cards/cardStory';

import './blog.scss';

const BlogGrid = props => {
  return (
    <section className="blog-grid">
      {props.clients.map(client => (
        <CardStory
          key={client.node.id}
          status={client.node.status}
          date={
            client.node.status === 'Unhoused'
              ? client.node.dateHoused
              : client.node.dateFundingBegan
          }
          title={`Meet ${client.node.firstName}`}
          description={`${client.node.situation.slice(0, 90)}...`}
          time="9 min"
          slug={client.node.slug}
          imageUrl={client.node.imageUrl}
          date={client.node.dateHoused}
        />
      ))}
    </section>
  );
};

export default BlogGrid;
