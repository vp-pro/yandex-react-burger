import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ children, onClose, headerText }) => {

  const handleCloseIconClick = (e) => {
    onClose(e)
  }

  const handleEscPress = React.useCallback((e) => {
    if (e.key === 'Escape') {
      onClose(e);
    }
  }, [onClose]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, [handleEscPress]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={(e) => onClose(e)}/>
        <div className={styles.modal}>
            <div className={styles.icon}>
                <CloseIcon onClick={handleCloseIconClick}/>
              </div>
            {children}
          </div>
      </>
      ),
    document.getElementById('react-modals'))
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  headerText: PropTypes.string,
};

export default Modal;