import React from 'react';
import PropTypes from 'prop-types';
import styles from'./ModalOverlay.module.css'

const ModalOverlay = ({ children, onClose }) => {

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e)
    }
  }

  const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      onClose(e);
    }
  };

  React.useEffect(() => {
    // Adding the event listener on component mount
    document.addEventListener('keydown', handleEscPress);
    // Removing the event listener on component unmount
    return () => document.removeEventListener('keydown', handleEscPress);
  }, []);


  return <div className={styles.modalOverlay} onClick={handleModalOverlayClick}>
    {children}
  </div>;
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;