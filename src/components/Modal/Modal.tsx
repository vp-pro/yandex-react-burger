import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModal {
  onClose: (e?: any)=> void;
  children: ReactNode;
}


const Modal: React.FC<IModal> = ( {onClose, children } ) => {

  const handleCloseIconClick = (e: any) => {
    onClose(e)
  }

  const handleEscPress = React.useCallback((e: any) => {
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
            <div className={styles.icon} onClick={handleCloseIconClick}>
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