import React, { useState, useEffect } from 'react';

import MoreIcon from '../../assets/ellipsis-v-solid.svg';
import Loader from '../common/Loader/loader';

import '../../styles/global.scss';
import '../Dashboard/dashboard.scss';

/**
 * todo add dropdown menu upon MoreIcon click
 * * update credit card or billing details
 * * delete credit card
 * todo figure out how to refesh page after new credit card added
 */

const SavedCreditCards = ({ firebase, user }) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  let isMounted = true;

  // when component un mounts
  useEffect(() => {
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (firebase && isMounted) {
      setLoading(true);
      firebase.getUser({ userId: user.username }).then(snapshot => {
        firebase
          .listPaymentMethods({
            customerId: snapshot.data().customerId,
          })
          .then(result => {
            setWallet(result.data.data);
            setLoading(false);
          })
          .catch(error => {
            console.log(`ERROR: ${error.message}`);
            setLoading(false);
          });
      });
    }
  }, [firebase]);

  return (
    <div className="dashboard-item">
      <h3>Saved Credit Cards</h3>
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        !!wallet &&
        wallet.map(card => (
          <>
            <div className="saved-card-row">
              <div>
                <h4>Card</h4>
                <p>{card.card.brand}</p>
              </div>
              <div>
                <h4>Number</h4>
                <p>**** {card.card.last4}</p>
              </div>
              <div>
                <h4>Exp</h4>
                <p>
                  {card.card.exp_month} / {card.card.exp_year}
                </p>
              </div>
              <div className="row-more">
                <MoreIcon />
              </div>
            </div>
            <div className="row-divider" />
          </>
        ))
      )}
    </div>
  );
};

export default SavedCreditCards;
