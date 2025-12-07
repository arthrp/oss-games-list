import React from 'react';
import styles from './gameDetailsModal.module.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string,
  homepage: string,
  children: React.ReactNode;
}

const GameDetailsModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, homepage }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalInner}>
        <h3>{title}</h3>
        {children}
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GameDetailsModal;