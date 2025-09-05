import React from 'react';
import './ConfirmPopup.css';
import { useState, useContext } from 'react';

function ConfirmPopup({ 
   confirmType, 
   cancel, 
   loggedPW, 
   setLoggedPW, 
   confirm 
}) {

   // STATES

   // CONTEXTS
   
   // FUNCTIONS

   return (
    <div className={`confirm-popup ${confirmType}`}>
      <h3 className='confirm-popup-message'>{confirmType === 'delete' ? 'Delete Account?' : confirmType === 'logout' ? 'Logout?' : ''}</h3>
      {confirmType === 'delete' && (
         <>
            <span className='confirm-popup-message-details'>Please enter your password to delete</span>

            <input onChange={(e) => setLoggedPW(e.target.value)} value={loggedPW} type="text" className="confirm-popup-pw-confirm-input" placeholder='password' />

            <span className='confirm-popup-message-details little'>Note: All data will be permanantly deleted and cannot be undone</span>
         </>
      )}
      
      <div className="confirm-popup-btns">
         <button onClick={cancel} className="confirm-popup-btn-cancel">Cancel</button>
         <button onClick={confirm} className="confirm-popup-btn-confirm">{confirmType === 'delete' ? 'Delete' : confirmType === 'logout' ? 'Logout' : ''}</button>
      </div>
    </div>
  )
}

export default ConfirmPopup;