import React, { useContext, useState } from 'react';
import './MenuSlider.css';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/Notification/Notification';

function MenuSlider({ toggleMenuSlider, toggleAuth, goToLogin, goToRegister }) {
   
   const { isLoggedIn, user, logout, deleteAccount } = useContext(AuthContext);
   const { showNotification } = useContext(NotificationContext);


   //logout 
   const handleLogout = async () => {
      const loggedOut = await logout();

      if (loggedOut) {
         showNotification('successfully logged out');
         toggleMenuSlider();
      } else {
         showNotification('error logging out');
      }
   }

   //delete account
   const [isDeleting, setIsDeleting] = useState(false);
   const [confirmOpen, setConfirmOpen] = useState(false);
   const [loggedPW, setLoggedPW] = useState('');

   const showConfirmTab = () => {
      setConfirmOpen(true);
   }

   const handleDeleteAccount = async () => {
      setIsDeleting(true);

      if (!loggedPW) {
         return;
      }

      const deletedAccount = await deleteAccount(loggedPW);

      if (deletedAccount) {
         setConfirmOpen(false);
         showNotification('account successfully deleted');
         setIsDeleting(false);
         toggleMenuSlider();
      }
   }



   return (
    <div className='menu-slider-div'>

      <div className='menu-slider-top-flex'>
         <h4 className='menu-slider-account-name'>{isLoggedIn ? `${user}` : 'Currently logged in as guest'}</h4>
      
         <svg className='menu-slider-close' onClick={toggleMenuSlider} width="20" height="20" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.212138 5.99466L6.07895 0.209207C6.3618 -0.0697356 6.82064 -0.0697356 7.10349 0.209207L7.78782 0.884087C8.07037 1.16273 8.07067 1.61404 7.78903 1.89328L3.13935 6.49985L7.78873 11.1067C8.07067 11.386 8.07007 11.8373 7.78752 12.1159L7.10319 12.7908C6.82034 13.0697 6.3615 13.0697 6.07865 12.7908L0.212138 7.00504C-0.0707126 6.7261 -0.0707126 6.2736 0.212138 5.99466Z" fill="black"/>
         </svg>
      </div>

      <ul className='menu-nav-list'>
         {/* <div className="menu-nav-auth-options">
            <li onClick={toggleAuth}>Login</li>
            <li>Register</li>
         </div> */}

         {/* <div className='contact-div'>
            <p>Contact Us:</p>
            <span className='contact-link'>languageTrackerTeam@gmail.com</span>
         </div> */}

         {isLoggedIn && (
            <div className="menu-nav-auth-btns">
               <button onClick={handleLogout} className='logout-btn enabled'>Logout</button>
               <button onClick={showConfirmTab} className='delete-account-btn enabled'>Delete Account</button>
            </div>
         )}
         {!isLoggedIn && (
            <div className="menu-nav-auth-btns">
               <button onClick={goToLogin} className='login-btn enabled'>Login</button>
               <button onClick={goToRegister} className='sign-up-btn enabled'>Sign Up</button>
            </div>
         )}
      </ul>


      {confirmOpen && (
        <div className="delete-account-confirm-tab">
          <h3 className="delete-account-confirm-h3">Please enter your password to delete account</h3>
          <span className='delete-account-confirm-note'>Warning: All data will be lost and cannot be undone. </span>
          <input onChange={(e) => setLoggedPW(e.target.value)} value={loggedPW} type="text" className="delete-account-confirm-pw-input" placeholder='password'/>
          <button onClick={handleDeleteAccount} className="delete-account-confirm-submit-btn enabled">Submit</button>
        </div>
      )}
    </div>
  )
}

export default MenuSlider