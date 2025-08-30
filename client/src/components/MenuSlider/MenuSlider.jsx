import React, { useContext, useEffect, useState, useRef } from 'react';
import './MenuSlider.css';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/Notification/Notification';
import { Link } from 'react-router-dom';
import { XIcon } from '../../assets/Icons/Icons';

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
         setLoggedPW('');
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

   const cancelDeleteAccount = () => {
      setConfirmOpen(false);
      setIsDeleting(false);
      setLoggedPW('');
   }



   return (
    <div className={`menu-slider-div ${menuSliderVisible ? 'open' : ''}`}>

      <div className='menu-slider-top-flex'>
         <h4 ref={h4Ref} className='menu-slider-account-name fade'>{isLoggedIn ? `${user}` : 'Currently logged in as guest'}</h4>

         <XIcon height="27" width="27" ref={closeRef} onClick={toggleMenuSlider} className="menu-slider-close" />

      </div>

      <ul className='menu-nav-list'>

         {isLoggedIn && (
            <div ref={authBtnsRef} className="menu-nav-auth-btns fade">
               <button onClick={handleLogout} className='logout-btn enabled'>Logout</button>
               <button onClick={showConfirmTab} className='delete-account-btn enabled'>Delete Account</button>
            </div>
         )}
         {!isLoggedIn && (
            <div ref={authBtnsRef} className="menu-nav-auth-btns fade">
               <Link to='/login'>
                  <button onClick={goToLogin} className='login-btn enabled'>Login</button>
               </Link>
               <Link to='/register'>
                  <button onClick={goToRegister} className='sign-up-btn enabled'>Sign Up</button>
               </Link>
            </div>
         )}
      </ul>


      {confirmOpen && (
        <div className="delete-account-confirm-tab">

         <XIcon onClick={cancelDeleteAccount} className='delete-account-close' width="20" height="20" />

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