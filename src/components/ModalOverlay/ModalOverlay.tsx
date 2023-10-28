import React from 'react';
import styles from'./ModalOverlay.module.css'


interface IModalOverlay {
  onClose: () => void;
}
const ModalOverlay: React.FC<IModalOverlay> = ( {onClose} ) => {

  const handleModalOverlayClick = (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  return <div className={styles.modalOverlay} onClick={handleModalOverlayClick}/>;
};

export default ModalOverlay;