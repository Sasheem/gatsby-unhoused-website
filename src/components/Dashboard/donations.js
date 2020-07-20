import React, { useState, useEffect } from 'react';
import moment from 'moment';

import MoreIcon from '../../assets/ellipsis-v-solid.svg';
import Button from '../common/Button/button';
import Loader from '../common/Loader/loader';

import './dashboard.scss';

/**
 * todo move getUser to Dashboard parent component
 * todo make use of loading state
 */

const Donations = ({ firebase, user }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  // subscribe to donations
  useEffect(() => {
    if (firebase && user) {
      setLoading(true);
      const unsubscribe = firebase.subscribeToDonations({
        username: user.username,
        onSnapshot: snapshot => {
          const snapshotDonations = [];
          snapshot.forEach(doc => {
            snapshotDonations.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setDonations(snapshotDonations);
          setLoading(false);
        },
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, []);

  return (
    <div className="dashboard-item">
      <h3>Donations</h3>
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : donations.length !== 0 ? (
        <table>
          <thead>
            <tr className="donation-row">
              <th>
                <p>Date</p>
              </th>
              <th>
                <p>Client</p>
              </th>
              <th>
                <p>Amount</p>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr className="donation-row">
                <td className="client-item">
                  <p>{moment(donation.date.toDate()).format('ll')}</p>
                </td>
                <td>
                  <p>{donation.client}</p>
                </td>
                <td className="client-item">
                  <p>${donation.amount}</p>
                </td>

                <td className="row-more">
                  <MoreIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="dashboard-message">
          <h5>Make your first donation</h5>
          <Button label="Donate" destination="contactDonate" />
        </div>
      )}
    </div>
  );
};

export default Donations;
