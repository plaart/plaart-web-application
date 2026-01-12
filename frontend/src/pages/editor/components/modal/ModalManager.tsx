import React from "react";
import UserModal from "./UserModal";
import ControlPanelModal from "./ControlPanelModal";
import ExportModal from "./ExportModal";

type ModalType = "user" | "control" | "export" | null;

interface ModalManagerProps {
  activeModal: ModalType;
  closeModal: () => void;
}

const ModalManager: React.FC<ModalManagerProps> = ({
  activeModal,
  closeModal,
}) => {
  return (
    <>
      <UserModal isOpen={activeModal === "user"} onClose={closeModal} />

      <ControlPanelModal
        isOpen={activeModal === "control"}
        onClose={closeModal}
      />

      <ExportModal isOpen={activeModal === "export"} onClose={closeModal} />
    </>
  );
};

export default ModalManager;
