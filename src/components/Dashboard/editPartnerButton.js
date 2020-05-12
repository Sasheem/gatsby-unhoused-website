import React, { useState } from 'react';
import Modal from 'react-modal';

import EditPartnerForm from './editPartnerForm';
import MoreIcon from '../../assets/ellipsis-v-solid.svg';

import '../../styles/global.scss';
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
Modal.setAppElement('#___gatsby');

const EditClientButton = ({ partner }) => {
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

  return (
    <div className="row-more">
      <MoreIcon onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Partner"
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>
          Parnter: {partner.name}
        </h2>
        <button onClick={closeModal}>Close</button>
        <EditPartnerForm partner={partner} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default EditClientButton;
