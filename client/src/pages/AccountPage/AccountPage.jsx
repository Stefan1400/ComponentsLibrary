import React, { useContext, useState } from 'react';
import './AccountPage.css';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/Notification/Notification';
import { Link } from 'react-router-dom';

function AccountPage({ goToLogin, goToRegister }) {
   

   const { isLoggedIn, user, logout, deleteAccount } = useContext(AuthContext);
   const { showNotification } = useContext(NotificationContext);

   //logout 
      const handleLogout = async () => {
         const loggedOut = await logout();
   
         if (loggedOut) {
            showNotification('successfully logged out');
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
            setLoggedPW('');
         }
      }

      const cancelDeleteAccount = () => {
         setConfirmOpen(false);
         setIsDeleting(false);
         setLoggedPW('');
      }

   return (
    <div className='account-page page'>
      <h2>{`Hello, ${isLoggedIn ? user : 'Guest'}`}</h2>
      {isLoggedIn && (
            <div className="menu-nav-auth-btns">
               <button onClick={handleLogout} className='logout-btn enabled'>Logout</button>
               <button onClick={showConfirmTab} className='delete-account-btn enabled'>Delete Account</button>
            </div>
         )}
         {!isLoggedIn && (
            <div className="menu-nav-auth-btns">
               <Link to='/login'>
                  <button onClick={goToLogin} className='login-btn enabled'>Login</button>
               </Link>
               <Link to='/register'>
                  <button onClick={goToRegister} className='sign-up-btn enabled'>Sign Up</button>
               </Link>
            </div>
         )}

         {confirmOpen && (
            <div className="delete-account-confirm-tab">
               <svg onClick={cancelDeleteAccount} className='delete-account-close' width="20" height="20" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0.646447" y1="25.6464" x2="25.6464" y2="0.64645" stroke="black"/>
                  <line x1="1.35355" y1="0.646447" x2="26.3535" y2="25.6464" stroke="black"/>
               </svg>
               <h3 className="delete-account-confirm-h3">Please enter your password to delete account</h3>
               <span className='delete-account-confirm-note'>Warning: All data will be lost and cannot be undone. </span>
               <input onChange={(e) => setLoggedPW(e.target.value)} value={loggedPW} type="text" className="delete-account-confirm-pw-input" placeholder='password'/>
               <button onClick={handleDeleteAccount} className="delete-account-confirm-submit-btn enabled">Submit</button>
            </div>
         )}
    </div>
  )
}

export default AccountPage