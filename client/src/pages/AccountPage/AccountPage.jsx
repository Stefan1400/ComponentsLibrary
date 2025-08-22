import React, { useContext, useState } from 'react';
import './AccountPage.css';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/Notification/Notification';

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
         }
      }

   return (
    <div className='account-page'>
      <h2>{`Hello, ${isLoggedIn ? user : 'Guest'}`}</h2>
      {isLoggedIn && (
            <div className="menu-nav-auth-btns fade">
               <button onClick={handleLogout} className='logout-btn enabled'>Logout</button>
               <button onClick={showConfirmTab} className='delete-account-btn enabled'>Delete Account</button>
            </div>
         )}
         {!isLoggedIn && (
            <div className="menu-nav-auth-btns fade">
               <button onClick={goToLogin} className='login-btn enabled'>Login</button>
               <button onClick={goToRegister} className='sign-up-btn enabled'>Sign Up</button>
            </div>
         )}

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

export default AccountPage