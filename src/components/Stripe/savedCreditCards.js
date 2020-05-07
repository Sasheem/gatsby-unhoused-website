import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import MoreIcon from '../../assets/ellipsis-v-solid.svg';
import AddIcon from '../../assets/plus-solid.svg';
import Loader from '../common/Loader/loader';
import AddCreditCardButton from '../Dashboard/addCreditCardButton';
/**
 * todo add dropdown menu upon MoreIcon click
 * * update credit card or billing details
 * * delete credit card
 * todo figure out how to refesh page after new credit card added
 */

const customStyles = {
  content: {
    top: '53%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '200px',
  },
};

// Bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#___gatsby');

const SavedCreditCards = ({ firebase, user }) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteCard, setDeleteCard] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  let isMounted = true;
  var subtitle;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
  }
  function closeModal() {
    setModalIsOpen(false);
  }

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
  }, [firebase, deleteSuccess]);

  function handleDeleteCard(card) {
    console.log(`are you sure you want to delete card: ${card}`);
    setDeleteCard(card);
    openModal();
  }

  function deleteConfirmed() {
    if (firebase && deleteCard !== '') {
      firebase
        .detachPaymentMethod({
          id: deleteCard,
        })
        .then(result => {
          setDeleteSuccess(true);
          closeModal();
        })
        .catch(error => {
          console.log(`delete card error: ${error.message}`);
        });
    }
  }

  console.dir(wallet);
  return (
    <div className="dashboard-item">
      <h3>Saved Credit Cards</h3>
      <div className="dashboard-cards">
        {/* <AddCreditCardButton /> */}
        {/* <div className="add-card">
          <div className="dashboard-icon">
            <AddIcon />
          </div>
        </div> */}
        {loading === true ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : !!wallet ? (
          wallet.map(card => (
            <div className="saved-card-container">
              <div className="saved-card">
                <div className="card-brand">
                  <p>{card.card.brand}</p>
                </div>
                <div className="card-number">
                  <p>****</p>
                  <p>****</p>
                  <p>****</p>
                  <p>{card.card.last4}</p>
                </div>
                <div className="card-details">
                  <div className="card-flex-md">
                    <p>Name</p>
                    <p>{card.billing_details.name}</p>
                  </div>
                  <div className="card-flex-sm">
                    <p>Exp</p>
                    <p>
                      {card.card.exp_month}/{card.card.exp_year}
                    </p>
                  </div>
                </div>
              </div>
              <div className="saved-card-options">
                <p
                  className="option-delete"
                  onClick={handleDeleteCard.bind(null, card.id)}
                >
                  DELETE
                </p>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Delete Card"
              >
                <h3 ref={_subtitle => (subtitle = _subtitle)}>
                  Are you sure you want to delete this card?
                </h3>
                <div className="option-delete-response">
                  <button onClick={deleteConfirmed}>Yes</button>
                  <button onClick={closeModal}>No</button>
                </div>
              </Modal>
            </div>
          ))
        ) : (
          <div className="empty-card-message">
            <p>Add a card below</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCreditCards;
