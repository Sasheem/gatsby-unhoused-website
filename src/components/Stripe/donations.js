import React, { useState, useEffect } from 'react';
import moment from 'moment';

import MoreIcon from '../../assets/ellipsis-v-solid.svg';

import '../../styles/global.scss';
import './stripe.scss';

/**
 * todo remove getUser and use userProfile as param from dashboard
 */

const Donations = ({ firebase, user }) => {
  const [userDonations, setUserDonations] = useState(null);
  const [listPromise, setListPromise] = useState(null);
  let isMounted = true;

  // when component un mounts
  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (firebase && isMounted) {
      firebase.getUser({ userId: user.username }).then(snapshot => {
        firebase
          .listPaymentIntents({
            customerId: snapshot.data().customerId,
          })
          .then(result => {
            setUserDonations(result.data.data);
          });
      });
    }
  }, [firebase]);

  return (
    <div className="dashboard-item">
      <h3>Donations</h3>
      {!!userDonations &&
        userDonations.map(donation => (
          <>
            <div className="donation-row">
              <div className="donation-item">
                <h4>Date</h4>
                <p>
                  {moment.unix(donation.charges.data[0].created).format('l')}
                </p>
              </div>
              <div className="donation-item">
                <h4>Amount</h4>
                <p>${donation.charges.data[0].amount * 0.01}.00</p>
              </div>
              <div className="donation-item">
                <h4>Card</h4>
                <p>
                  {donation.charges.data[0].payment_method_details.card.brand}{' '}
                  {donation.charges.data[0].payment_method_details.card.last4}
                </p>
              </div>
              <div className="donation-item">
                <h4>Status</h4>
                <p>{donation.charges.data[0].status}</p>
              </div>
              <div className="row-more">
                <MoreIcon />
              </div>
            </div>
            <div className="row-divider" />
          </>
        ))}
    </div>
  );
};

export default Donations;
