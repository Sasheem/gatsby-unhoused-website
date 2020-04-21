import React, { useState, useEffect } from 'react';
import moment from 'moment';

import MoreIcon from '../../assets/ellipsis-v-solid.svg';
import Button from '../common/Button/button';

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
      firebase.getUser({ userId: user.username }).then(snapshot => {
        setLoading(true);
        console.log(`user: ${user.username}`);
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
              console.log(`number of donations: ${donationsData.length}`);
            })
            .catch(error => {
              console.log(`error: ${error.message}`);
            });
        }
      });
    }
  }, [firebase]);

  return (
    <div className="dashboard-item">
      <h3>Donations</h3>
      {donations.length !== 0 ? (
        donations.map(donation => (
          <>
            <div className="donation-row">
              <div className="donation-item">
                <h5>Date</h5>
                <p>{donation.date}</p>
              </div>
              <div className="donation-item">
                <h5>Amount</h5>
                <p>${donation.amount}.00</p>
              </div>
              <div className="donation-item">
                <h5>Card</h5>
                <p>
                  {donation.brand} {donation.last4}
                </p>
              </div>
              <div className="row-more">
                <MoreIcon />
              </div>
            </div>
            <div className="row-divider" />
          </>
        ))
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
