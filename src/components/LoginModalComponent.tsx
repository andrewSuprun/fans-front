import React from 'react';

// Define the type for the props the modal expects
type ModalProps = {
  handleClose: () => void;
};

const LoginModal: React.FC<ModalProps> = ({ handleClose }) => {
  return (
    <div
      className="modal show"
      tabIndex={-1}
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login Required</h5>
          </div>
          <div className="modal-body">
            <p className="text-center">Please log in to view your profile.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(event) => handleClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
