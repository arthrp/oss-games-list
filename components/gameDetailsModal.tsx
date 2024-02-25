import React from 'react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3><a href={homepage}>{title}</a></h3>
        {children}
        <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default GameDetailsModal;