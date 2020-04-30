import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { FirebaseContext } from '../Firebase';
import EditClientButton from './editClientButton';
import Loader from '../common/Loader/loader';

import './dashboard.scss';

const AdminAllClients = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  let isMounted = true;

  // applying this form of useEffect ensures
  // it only runs once when the component mounts
  // useEffect(() => {}, []);

  // adding empty array as second arg means useEffect will only
  // run when the component is mounted and won't run when the
  // component is updated
  useEffect(() => {
    if (firebase) {
      setLoading(true);
      const unsubscribe = firebase.subscribeToAllClients({
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
          setLoading(false);
        },
      });

      // when the effect ends, it can return
      // we use this cause its similar to componentDidUnmount
      return () => {
        if (unsubscribe) {
          console.log(`running unsubscribe`);
          unsubscribe();
          setLoading(false);
        }
      };
    }
  }, []);

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
                    ? moment(new Date(client.dateHoused.toDate())).format('l')
                    : moment(new Date(client.dateFundingBegan.toDate())).format(
                        'l'
                      )}
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
                  className={
                    client.status === 'Housed'
                      ? 'housed'
                      : client.status === 'Funding'
                      ? 'funding'
                      : 'unhoused'
                  }
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
