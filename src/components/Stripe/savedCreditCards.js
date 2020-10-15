import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import MoreIcon from '../../assets/ellipsis-v-solid.svg';
import AddIcon from '../../assets/plus-solid.svg';
import DeleteIcon from '../../assets/times-solid.svg';
import Loader from '../common/Loader/loader';
import AddCreditCardButton from '../Dashboard/addCreditCardButton';

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
    if (firebase && user) {
      const unsubscribe = firebase.subscribeToUserInfo({
        username: user.username,
        onSnapshot: snapshot => {
          console.log(`snapshot data: ${typeof snapshot.data()}`);
          setWallet(snapshot.data().cards);
        },
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [firebase]);

  function handleDeleteCard(card) {
    console.log(`are you sure you want to delete card: ${card}`);
    setDeleteCard(card);
    openModal();
  }

  function deleteConfirmed() {
    if (firebase && deleteCard !== '') {
      try {
        firebase
          .detachPaymentMethod({
            id: deleteCard,
          })
          .then(result => {
            console.log(
              `detached paymentMethod from customer: ${typeof result}`
            );
            console.dir(result);
          });

        const modifiedCards = wallet.filter(
          card => card.paymentMethodId !== deleteCard
        );
        console.dir(modifiedCards);
        firebase.saveSetupIntent({
          username: user.username,
          cards: modifiedCards,
        });

        setDeleteSuccess(true);
        closeModal();
      } catch (error) {
        console.log(`deletePaymentMethod error: ${error.message}`);
      }
    }
  }

  console.dir(wallet);
  return (
    <div className="dashboard-item">
      <h3>Saved Credit Cards</h3>
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : !!wallet ? (
        <table>
          <thead>
            <tr className="saved-card-row">
              <th>
                <p>Name</p>
              </th>
              <th>
                <p>Last 4</p>
              </th>
              <th>
                <p>Expiration</p>
              </th>
              <th>
                <p>Brand</p>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {wallet.map(card => (
              <tr key={card.paymentMethodId} className="saved-card-row">
                <td>
                  <p>{card.billingDetails.name}</p>
                </td>
                <td>
                  <p>{card.last4}</p>
                </td>
                <td>
                  <p>
                    {card.expMonth}/{card.expYear}
                  </p>
                </td>
                <td>
                  <p>{card.brand}</p>
                </td>
                <td className="row-more">
                  <DeleteIcon
                    onClick={handleDeleteCard.bind(null, card.paymentMethodId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-card-message">
          <p>Add a card below</p>
        </div>
      )}
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
  );
};

export default SavedCreditCards;
