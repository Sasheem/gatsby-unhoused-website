import React, { useState } from 'react';
import Modal from 'react-modal';

import EditClientForm from './editClientForm';
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

const EditClientButton = ({ client }) => {
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
        contentLabel="Edit Client"
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>
          Client Profile: {client.firstName}
        </h2>
        <button onClick={closeModal}>Close</button>
        <EditClientForm client={client} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default EditClientButton;
