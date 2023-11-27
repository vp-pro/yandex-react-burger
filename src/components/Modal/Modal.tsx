import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {PropsWithChildren} from 'react';

interface IModal {
  onClose: (e?: MouseEvent | KeyboardEvent) => void;
}


const Modal: React.FC<PropsWithChildren<IModal>> = ( {onClose, children } ) => {

  const handleCloseIconClick = () => {
    onClose()
  }

  const handleEscPress = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, [handleEscPress]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={() => onClose()}/>
        <div className={styles.modal}>
            <div data-testid="close_modal_button" className={styles.icon} onClick={handleCloseIconClick}>
                <CloseIcon type="primary"/>
              </div>
            {children}
          </div>
      </>
      ),
      document.getElementById('react-modals') ?? document.body
      )
}


export default Modal;