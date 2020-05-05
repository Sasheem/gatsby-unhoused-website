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
  }, [firebase]);

  return (
    <div className="dashboard-item">
      <h3>Clients</h3>
      {loading === true ? (
        <div>
          <Loader />
        </div>
      ) : clients.length !== 0 ? (
        <table>
          <thead>
            <tr className="admin-client-row">
              <th>
                <p>Name</p>
              </th>
              <th>
                <p>Goal</p>
              </th>
              <th>
                <p>Joined</p>
              </th>
              <th>
                <p>Status</p>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr className="admin-client-row">
                <td className="client-item">
                  <p>{client.firstName}</p>
                </td>
                <td className="client-item">
                  <p>${client.goal}</p>
                </td>
                <td className="client-item">
                  <p>
                    {moment(new Date(client.dateFundingBegan.toDate())).format(
                      'l'
                    )}
                  </p>
                </td>
                <td className="client-item">
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
                </td>
                <td className="client-item">
                  <EditClientButton client={client} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default AdminAllClients;
