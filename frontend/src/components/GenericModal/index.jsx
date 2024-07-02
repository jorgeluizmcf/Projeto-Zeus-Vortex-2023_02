import React from "react";
import "./styles.css"; // Adicione o arquivo CSS para estilos

const GenericModal = ({ isOpen, onClose, onConfirm, title, content, width }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="generic-modal-overlay">
      <div className="generic-modal-container" style={{maxWidth: width}}>
        <h2 className="generic-modal-content-title">{title}</h2>
        <div className="generic-modal-content">{content}</div>
        <div className="generic-modal-buttons">
          <button className="generic-modal-close-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="generic-modal-confirm-button" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
