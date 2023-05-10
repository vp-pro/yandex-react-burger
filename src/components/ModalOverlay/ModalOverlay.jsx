import React from 'react';
import PropTypes from 'prop-types';
import styles from'./ModalOverlay.module.css'

const ModalOverlay = ({ children, onClose }) => {

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  return <div className={styles.modalOverlay} onClick={handleModalOverlayClick}>
    {children}
  </div>;
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;