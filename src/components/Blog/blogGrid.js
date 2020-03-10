import React from 'react';

import CardStory from '../Cards/cardStory';

import './blog.scss';

const BlogGrid = props => {
  return (
    <div className="blog-grid">
      {props.clients.map(client => (
        <CardStory
          key={client.id}
          status={client.status}
          date={
            client.status === 'Unhoused'
              ? client.dateHoused
              : client.dateFundingBegan
          }
          firstName={client.firstName}
          lastName={client.lastName}
          description={`${client.situation.slice(0, 90)}...`}
          time="9 min"
          raised={client.raised}
          slug={client.slug}
          imageUrl={client.imageUrl}
        />
      ))}
    </div>
  );
};

export default BlogGrid;
