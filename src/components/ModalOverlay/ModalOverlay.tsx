import React, { ReactEventHandler } from 'react';
import PropTypes from 'prop-types';
import styles from'./ModalOverlay.module.css'


interface IModalOverlay {
  onClose: (e: any) => void
}
const ModalOverlay: React.FC<IModalOverlay> = ( {onClose} ) => {

  const handleModalOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose(e)
    }
  }
  return <div className={styles.modalOverlay} onClick={handleModalOverlayClick}/>;
};

export default ModalOverlay;