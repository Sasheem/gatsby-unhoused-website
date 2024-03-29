import React, { useState, useEffect } from 'react';

import { FirebaseContext } from '../Firebase';
import CardClientFeatured from '../Cards/cardClientFeatured';
import CardClientAdmin from '../Cards/cardClientAdmin';

import '../../styles/global.scss';

const FeaturedClients = ({ firebase, isAdmin }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (firebase) {
      const unsubscribe = firebase.subscribeToFundingClients({
        onSnapshot: snapshot => {
          console.dir(snapshot);
          const snapshotClients = [];

          // forEach provided from firebase, not javascript forEach
          // it behaves the same though
          // data() returns the data for a snapshot
          snapshot.forEach(doc => {
            snapshotClients.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          setClients(snapshotClients);
        },
      });

      // when the effect ends, it can return
      // we use this cause its similar to componentDidUnmount
      return () => {
        if (unsubscribe) {
          console.log(`running unsubscribe`);
          unsubscribe();
        }
      };
    }
  }, [firebase]);

  return (
    <div className={isAdmin ? `admin-container-clients` : `container-clients`}>
      {!!clients &&
        clients.map(client => {
          if (isAdmin) {
            return <CardClientAdmin client={client} />;
          } else {
            return <CardClientFeatured key={client.id} client={client} />;
          }
        })}
    </div>
  );
};

export default FeaturedClients;
