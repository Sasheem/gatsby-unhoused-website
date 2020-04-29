import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { FirebaseContext } from '../Firebase';
import MoreIcon from '../../assets/ellipsis-v-solid.svg';
import EditClientButton from './editClientButton';
import Loader from '../common/Loader/loader';

import './dashboard.scss';

const AdminAllClients = () => {
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
    // query all available clients if firebase exists
    if (firebase) {
      setLoading(true);
      firebase
        .getClients()
        .then(snapshot => {
          // check if component is mounted
          if (isMounted) {
            const availableClients = [];
            snapshot.forEach(doc => {
              availableClients.push({
                id: doc.id,
                ...doc.data(),
              });
            });

            // save clients to state
            setClients(availableClients);
            setLoading(false);
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(`error fetching clients: ${error.message}`);
        });
    }
  }, [firebase]);

  return (
    <div className="dashboard-item">
      <h3>Clients</h3>
      {loading === true ? (
        <div>
          <Loader />
        </div>
      ) : clients.length !== 0 ? (
        clients.map(client => (
          <>
            <div className="admin-client-row">
              <div className="client-item">
                <h5>Name</h5>
                <p>{client.firstName}</p>
              </div>
              <div className="client-item">
                <h5>{client.status === 'Housed' ? 'Housed' : 'Joined UH'}</h5>
                <p>
                  {client.status === 'Housed'
                    ? moment(new Date(client.dateHoused)).format('l')
                    : moment(new Date(client.dateFundingBegan)).format('l')}
                </p>
              </div>
              <div className="client-item">
                <h5>{client.status === 'Housed' ? 'Goal' : 'Raised'}</h5>
                <p>
                  ${client.status === 'Housed' ? client.goal : client.raised}
                </p>
              </div>
              <div className="client-item">
                <h5>Status</h5>
                <p
                  className={client.status === 'Housed' ? 'housed' : 'unhoused'}
                >
                  {client.status}
                </p>
              </div>
              <EditClientButton client={client} />
            </div>
            <div className="row-divider" />
          </>
        ))
      ) : null}
    </div>
  );
};

export default AdminAllClients;
