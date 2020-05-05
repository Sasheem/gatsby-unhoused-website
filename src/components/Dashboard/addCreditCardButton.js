import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

import { FirebaseContext } from '../Firebase';
import UpdateCreditCard from '../Stripe/updateCreditCard';

import AddIcon from '../../assets/plus-solid.svg';
import './dashboard.scss';

const customStyles = {
  content: {
    top: '53%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '600px',
    overflow: 'scroll',
  },
};

// Bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#___gatsby');

const AddCreditCardButton = () => {
  var creditTitle;
  const { firebase = null, user } = useContext(FirebaseContext) || {};
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    creditTitle.style.color = 'black';
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div>
      <div className="add-card" onClick={openModal}>
        <div className="dashboard-icon">
          <AddIcon />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Credit Card"
      >
        <h2 ref={_creditTitle => (creditTitle = _creditTitle)}>
          Add Credit Card
        </h2>
        <button onClick={closeModal}>Close</button>
        <UpdateCreditCard firebase={firebase} user={user} />
      </Modal>
    </div>
  );
};

export default AddCreditCardButton;
