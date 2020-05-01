import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import BlogGrid from '../Blog/blogGrid';
import Button from '../common/Button/button';
import Loader from '../common/Loader/loader';

import './dashboard.scss';

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
      setLoading(true);
      firebase.getClients().then(snapshot => {
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
        setLoading(false);
      });
    }
  }, [firebase]);
  return (
    <>
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : clients.length !== 0 ? (
        <div>
          <h3>Clients funded</h3>
          <BlogGrid clients={clients} loading={loading} />
        </div>
      ) : (
        <div className="dashboard-message">
          <h5>Read a client story</h5>
          <Button label="Meet Clients" destination="clientsInNeed" />
        </div>
      )}
    </>
  );
};

export default ClientsFunded;
