import React, { useState, useContext, useEffect } from 'react';

import { FirebaseContext } from '../Firebase';
import CardClientFeatured from '../Cards/cardClientFeatured';

import '../../styles/global.scss';

const FeaturedClients = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  // fetch clients to be featured
  useEffect(() => {
    if (firebase) {
      firebase.getClients().then(snapshot => {
        if (isMounted) {
          const featuredClients = [];
          snapshot.forEach(doc => {
            if (doc.data().status === 'Unhoused') {
              featuredClients.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });
          setClients(featuredClients);
        }
      });
    }
  }, [firebase]);

  return (
    <div className="content-three">
      {!!clients &&
        clients.map(client => (
          <CardClientFeatured key={client.id} client={client} />
        ))}
    </div>
  );
};

export default FeaturedClients;
