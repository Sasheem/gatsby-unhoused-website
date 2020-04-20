import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import BlogGrid from '../Blog/blogGrid';

import '../../styles/global.scss';

const ClientsFunded = ({ user }) => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (firebase) {
      firebase.getClients().then(snapshot => {
        setLoading(true);

        // check if component is mounted
        if (isMounted) {
          const fundedClients = [];
          snapshot.forEach(doc => {
            if (doc.data().hasOwnProperty('fundedBy')) {
              if (doc.data().fundedBy.includes(`${user.username}`)) {
                fundedClients.push({
                  id: doc.id,
                  ...doc.data(),
                });
              }
            }
          });
          setClients(fundedClients);
          setLoading(false);
        }
      });
    }
  }, [firebase]);
  return <BlogGrid clients={clients} loading={loading} />;
};

export default ClientsFunded;
