import React from 'react';
import PropTypes from 'prop-types';
import styles from'./ModalOverlay.module.css'

const ModalOverlay = ({ onClose }) => {

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e)
    }
  }
  return <div className={styles.modalOverlay} onClick={handleModalOverlayClick}/>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;