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
  let isMounted = true;

  // when component un mounts
  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (firebase) {
      setLoading(true);
      firebase.getUser({ userId: user.username }).then(snapshot => {
        if (isMounted) {
          firebase
            .listPaymentIntents({
              customerId: snapshot.data().customerId,
            })
            .then(result => {
              const donationsData = [];
              result.data.data.forEach(doc => {
                if (doc.status === 'succeeded') {
                  donationsData.push({
                    date: moment.unix(doc.created).format('l'),
                    amount: parseInt(doc.amount) * 0.01,
                    status: doc.status,
                    brand:
                      doc.charges.data[0].payment_method_details.card.brand,
                    last4:
                      doc.charges.data[0].payment_method_details.card.last4,
                  });
                }
              });
              setDonations(donationsData);
              setLoading(false);
            })
            .catch(error => {
              setLoading(false);
              console.log(`error: ${error.message}`);
            });
        }
      });
    }
  }, [firebase]);

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
                <p>Amount</p>
              </th>
              <th>
                <p>Card</p>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr className="donation-row">
                <td className="client-item">
                  <p>{donation.date}</p>
                </td>
                <td className="client-item">
                  <p>${donation.amount}</p>
                </td>
                <td className="client-item">
                  <p>
                    {donation.brand} {donation.last4}
                  </p>
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
