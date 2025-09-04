import React from 'react';
import './ConfirmPopup.css';

function ConfirmPopup({ confirmType, cancelDelete, confirmDelete }) {
  return (
    <div className='confirm-popup'>
      <h3 className='confirm-popup-message'>{confirmType === 'delete' ? 'Delete Account?' : confirmType === 'logout' ? 'Logout?' : ''}</h3>
      {confirmType === 'delete' && (
         <span className='confirm-popup-message-details'>All data will be permanantly deleted</span>
      )}
      
      <div className="confirm-popup-btns">
         <button onClick={cancelDelete} className="confirm-popup-btn-cancel">Cancel</button>
         <button onClick={confirmDelete} className="confirm-popup-btn-confirm">{confirmType === 'delete' ? 'Delete' : confirmType === 'logout' ? 'Logout' : ''}</button>
      </div>
    </div>
  )
}

export default ConfirmPopup;