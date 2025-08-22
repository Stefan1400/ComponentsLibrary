import React, { useContext, useEffect, useState, useRef } from 'react';
import './MenuSlider.css';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/Notification/Notification';

function MenuSlider({ menuSliderVisible, toggleMenuSlider, toggleAuth, goToLogin, goToRegister }) {
   
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

   const h4Ref = useRef();
   const closeRef = useRef();
   const authBtnsRef = useRef();

   useEffect(() => {
      if (menuSliderVisible) {
         setTimeout(() => h4Ref.current?.classList.add('visible'), 350);
         setTimeout(() => closeRef.current?.classList.add('visible'), 350);
         setTimeout(() => authBtnsRef.current?.classList.add('visible'), 700);
      } else {
         h4Ref.current?.classList.remove('visible');
         closeRef.current?.classList.remove('visible');
         authBtnsRef.current?.classList.remove('visible');
      }
   }, [menuSliderVisible]);



   return (
    <div className={`menu-slider-div ${menuSliderVisible ? 'open' : ''}`}>

      <div className='menu-slider-top-flex'>
         <h4 ref={h4Ref} className='menu-slider-account-name fade'>{isLoggedIn ? `${user}` : 'Currently logged in as guest'}</h4>
      
         {/* <svg width="20" height="20" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.212138 5.99466L6.07895 0.209207C6.3618 -0.0697356 6.82064 -0.0697356 7.10349 0.209207L7.78782 0.884087C8.07037 1.16273 8.07067 1.61404 7.78903 1.89328L3.13935 6.49985L7.78873 11.1067C8.07067 11.386 8.07007 11.8373 7.78752 12.1159L7.10319 12.7908C6.82034 13.0697 6.3615 13.0697 6.07865 12.7908L0.212138 7.00504C-0.0707126 6.7261 -0.0707126 6.2736 0.212138 5.99466Z" fill="black"/>
         </svg> */}

         <svg ref={closeRef} onClick={toggleMenuSlider} className='menu-slider-close fade' width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.646447" y1="25.6464" x2="25.6464" y2="0.64645" stroke="white"/>
            <line x1="1.35355" y1="0.646447" x2="26.3535" y2="25.6464" stroke="white"/>
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
            <div ref={authBtnsRef} className="menu-nav-auth-btns fade">
               <button onClick={handleLogout} className='logout-btn enabled'>Logout</button>
               <button onClick={showConfirmTab} className='delete-account-btn enabled'>Delete Account</button>
            </div>
         )}
         {!isLoggedIn && (
            <div ref={authBtnsRef} className="menu-nav-auth-btns fade">
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