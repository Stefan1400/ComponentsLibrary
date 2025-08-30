import { useState, useEffect, createContext } from "react";
import './Notification.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
   const [ message, setMessage ] = useState('');
   const [ error, setError ] = useState('');
   const [ isVisible, setIsVisible ] = useState(false);

   const showNotification = (message) => {
      setMessage(message);
      setIsVisible(true);
      setTimeout(() => {
         setIsVisible(false);
         setMessage('');
      }, 3000);
   }

   return (
      <NotificationContext.Provider value={{ message, showNotification }}>
         {children}
         {isVisible && (
            <div className='popup-div'>
               <span className='popup-text'>{message}</span>
            </div>
         )}
      </NotificationContext.Provider>
   );
}

export {NotificationContext};







// import React from 'react'
// import './Notification.css'

// function Notification({ message, error }) {
//   return (
//     
//   )
// }

// export default Notification;