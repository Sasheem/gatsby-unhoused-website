import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { FirebaseContext } from '../Firebase';
import EditPartnerButton from './editPartnerButton';
import Loader from '../common/Loader/loader';

import './dashboard.scss';

const AdminAllPartners = () => {
  const { firebase = null } = useContext(FirebaseContext) || {};
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (firebase) {
      const unsubscribe = firebase.subscribeToAllPartners({
        onSnapshot: snapshot => {
          console.dir(snapshot);
          const snapshotPartners = [];

          snapshot.forEach(doc => {
            snapshotPartners.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setPartners(snapshotPartners);
          setLoading(false);
        },
      });
      return () => {
        if (unsubscribe) {
          unsubscribe();
          setLoading(false);
        }
      };
    }
  }, [firebase]);
  return (
    <div className="dashboard-item">
      <h3>Partners</h3>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        partners.length !== 0 && (
          <table>
            <thead>
              <tr className="admin-partner-row">
                <th>
                  <p>Name</p>
                </th>
                <th>
                  <p>Email</p>
                </th>
                <th>
                  <p>Website</p>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {partners.map(partner => (
                <tr className="admin-partner-row">
                  <td>
                    <p>{partner.name}</p>
                  </td>
                  <td>
                    <p>{partner.email}</p>
                  </td>
                  <td>
                    <a href={partner.website} target="_blank">
                      {' '}
                      {partner.website.length > 20
                        ? `${partner.website.slice(0, 21)} ...`
                        : partner.website}
                    </a>
                  </td>
                  <td>
                    <EditPartnerButton partner={partner} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default AdminAllPartners;
