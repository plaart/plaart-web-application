import { useState } from 'react';

type ModalType = 'user' | 'control' | 'export' | null;

export const useModal = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const isModalOpen = (modalType: ModalType) => {
    return activeModal === modalType;
  };

  return {
    activeModal,
    openModal,
    closeModal,
    isModalOpen
  };
};
