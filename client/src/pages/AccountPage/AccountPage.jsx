import React, { useContext, useState } from 'react';
import './AccountPage.css';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/Notification/Notification';
import { Link } from 'react-router-dom';
import { XIcon } from '../../assets/Icons/Icons';
import ConfirmPopup from '../../components/ConfirmPopup/ConfirmPopup';

function AccountPage({ goToLogin, goToRegister }) {

   const { isLoggedIn, user, logout, deleteAccount } = useContext(AuthContext);
   const { showNotification } = useContext(NotificationContext);

   //logout 
      const handleLogout = async () => {
         const loggedOut = await logout();
         
         if (loggedOut) {
            showNotification('successfully logged out');
            setShowLogoutConfirm(false);
         } else {
            showNotification('error logging out');
         }
      }
   
      //delete account
      const [isDeleting, setIsDeleting] = useState(false);
      const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
      const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
      const [loggedPW, setLoggedPW] = useState('');

      const showConfirmPopup = (type) => {
         if (type === 'delete') {
            setShowDeleteConfirm(true);
            return;
         } else if (type === 'logout') {
            setShowLogoutConfirm(true);
            return;
         }
      }
   
      const handleDeleteAccount = async () => {
         setIsDeleting(true);
   
         if (!loggedPW) {
            return;
         }
   
         const deletedAccount = await deleteAccount(loggedPW);
   
         if (deletedAccount) {
            setShowDeleteConfirm(false);
            showNotification('account successfully deleted');
            setIsDeleting(false);
            setLoggedPW('');
         }
      }

      const cancelDeleteAccount = () => {
         setShowDeleteConfirm(false);
         setIsDeleting(false);
         setLoggedPW('');
      }

      const cancelLogout = () => {
         setShowLogoutConfirm(false);
      }

   return (
    <div className='account-page page'>
      {showDeleteConfirm && (
         <ConfirmPopup 
            confirmType='delete' 
            cancel={cancelDeleteAccount} 
            loggedPW={loggedPW} 
            setLoggedPW={setLoggedPW}
            confirm={handleDeleteAccount}
         />
      )}
      {showLogoutConfirm && (
         <ConfirmPopup 
            confirmType='logout' 
            cancel={cancelLogout} 
            confirm={handleLogout}
         />
      )}
      
      <h3 className='page-header'>Account</h3>
      
      <h2 className='account-page-username-h2'>{`Hello, ${isLoggedIn ? user : 'Guest'}`}</h2>
      {isLoggedIn && (
            <div className="account-page-auth-btns">
               <button onClick={() => showConfirmPopup('logout')} className='auth-btn logout-btn'>Logout</button>
               <button onClick={() => showConfirmPopup('delete')} className='auth-btn delete-account-btn'>Delete Account</button>
            </div>
         )}
         {!isLoggedIn && (
            <div className="account-page-auth-btns">
               <Link to='/login'>
                  <button onClick={goToLogin} className='auth-btn login-btn'>Login</button>
               </Link>
               <Link to='/register'>
                  <button onClick={goToRegister} className='auth-btn sign-up-btn'>Sign Up</button>
               </Link>
            </div>
         )}
    </div>
  )
}

export default AccountPage